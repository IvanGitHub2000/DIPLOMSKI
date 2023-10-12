using Doggy.DataLayer.Services.Interfaces;
using Doggy.DataLayer.UnitOfWork;
using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services
{
    public class AdminService : IAdminService
    {
        private IUnitOfWork unitOfWork;

        public AdminService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Admin> VratiSveAdmine()
        {
            var result = unitOfWork.AdminRepository.All().ToList();
            return result;
        }

        public Admin DodajAdmina(Admin a, out StatusDodavanjaKorisnika status)
        {
            if (ValidacijaDodavanja(a, out status))
            {
                a.Tip = TipKorisnika.Admin;
                a.Sifra = BCrypt.Net.BCrypt.HashPassword(a.Sifra);
                var admin = unitOfWork.AdminRepository.Add(a);
                unitOfWork.SaveChanges();
                return admin;
            }
            return null;

        }

        public Admin ObrisiAdmina(int id)
        {
            Admin a = unitOfWork.AdminRepository.Get(id);
            if (a != null)
            {
                unitOfWork.AdminRepository.Delete(a);
                unitOfWork.SaveChanges();
                return a;
            }
            return null;
        }

        public Admin AzurirajAdmina(Admin a)
        {
            Admin admin = unitOfWork.AdminRepository.Get(a.Id);
            if (admin != null)
            {
                admin.Ime = a.Ime ?? admin.Ime;
                admin.Prezime = a.Prezime ?? admin.Prezime;
                admin.KorisnickoIme = a.KorisnickoIme ?? admin.KorisnickoIme;
                admin.Email = a.Email ?? admin.Email;
                if (a.Sifra != null)
                    admin.Sifra = BCrypt.Net.BCrypt.HashPassword(a.Sifra);
                //admin.Sifra = a.Sifra ?? admin.Sifra;
                admin.BrojTelefona = a.BrojTelefona ?? admin.BrojTelefona;
                admin.Grad = a.Grad ?? admin.Grad;
                admin.Adresa = a.Adresa ?? admin.Adresa;

                unitOfWork.AdminRepository.Update(admin);
                unitOfWork.SaveChanges();
                return admin;
            }
            return null;
        }

        public bool ValidacijaDodavanja(Admin v, out StatusDodavanjaKorisnika status)
        {

            var postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecSiter = unitOfWork.SiterRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecSiter != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecSiter = unitOfWork.SiterRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
            if (postojiVecSiter != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecVlasnik = unitOfWork.VlasnikRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecVlasnik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecVlasnik = unitOfWork.VlasnikRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
            if (postojiVecVlasnik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            status = StatusDodavanjaKorisnika.Uspesno;
            return true;
        }


    }
}
