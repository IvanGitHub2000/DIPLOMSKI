using Doggy.DataLayer.Services.Interfaces;
using Doggy.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services
{
    public class AuthService : IAuthService
    {
        private UnitOfWork.UnitOfWork unitOfWork;

        public AuthService(DoggyContext context)
        {
            this.unitOfWork = new UnitOfWork.UnitOfWork(context);
        }

        public string GenerateJWT(IConfiguration config, Korisnik user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>();
            Claim c = new Claim(ClaimTypes.NameIdentifier, user.KorisnickoIme);
            claims.Add(c);
            c = new Claim(ClaimTypes.Email, user.Email);
            claims.Add(c);
            //c = new Claim(ClaimTypes.GivenName, user.Ime);
            //claims.Add(c);
            //c = new Claim(ClaimTypes.Surname, user.Prezime);
            //claims.Add(c);
            string role ="";
            switch(user.Tip)
            {
                case TipKorisnika.Vlasnik:
                    role = "Vlasnik";
                    break;
                case TipKorisnika.Siter:
                    role = "Siter";
                    break;
                case TipKorisnika.Admin:
                    role = "Admin";
                    break;
                default:
                    break;
            };
            c = new Claim(ClaimTypes.Role, role);
            claims.Add(c);


            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Korisnik AuthenticateUser(Login data)
        {

            Korisnik result = VratiKorisnikaPoEmailu(data.Email);
            bool isValidPass = BCrypt.Net.BCrypt.Verify(data.Password, result.Sifra);

            if (result != null && isValidPass)
                return result;
            else return null;
        }


        public Korisnik VratiKorisnikaPoEmailu(string email)
        {

            Korisnik result = unitOfWork.AdminRepository.VratiAdminaPoEmailu(email);
            if (result == null)
                result = unitOfWork.SiterRepository.VratiSiteraPoEmailu(email);
            if (result == null)
                result = unitOfWork.VlasnikRepository.VratiVlasnikaPoEmailu(email);

            if (result != null)
                return result;
            else return null;
        }


        public bool ProveriValidnostSitera(int idSitera)
        {
            Siter s = unitOfWork.SiterRepository.Find(k => k.Id == idSitera).FirstOrDefault();
            return s.Validan;

        }
    }
}
