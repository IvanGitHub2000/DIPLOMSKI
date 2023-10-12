using Doggy.DataLayer.Services.Interfaces;
using Doggy.DataLayer.UnitOfWork;
using Doggy.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services
{
    public class VlasnikService : IVlasnikService
    {
        private IUnitOfWork unitOfWork;

        public VlasnikService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Vlasnik> VratiSveVlasnike()
        {
            var result = unitOfWork.VlasnikRepository.VratiSveVlasnike();
            return result;
        }
        public Vlasnik VratiVlasnikaPoId(int id)
        {
            return unitOfWork.VlasnikRepository.Get(id);
        }

        public Vlasnik DodajVlasnika(Vlasnik v, out StatusDodavanjaKorisnika status)
        {
            if (ValidacijaDodavanja(v, out status))
            {
                v.Tip = TipKorisnika.Vlasnik;
                v.Sifra = BCrypt.Net.BCrypt.HashPassword(v.Sifra);
                v.Slika = "defaultKorisnik.jpg";
                var vlasnik = unitOfWork.VlasnikRepository.Add(v);
                unitOfWork.SaveChanges();
                return vlasnik;
            }
            return null;

        }


        public Vlasnik AzurirajVlasnika(Vlasnik v, out StatusDodavanjaKorisnika status)
        {
            status = StatusDodavanjaKorisnika.Uspesno;
            Vlasnik vlasnik = unitOfWork.VlasnikRepository.Get(v.Id);
            if (vlasnik != null)
            {
                vlasnik.Ime = v.Ime ?? vlasnik.Ime;
                vlasnik.Prezime = v.Prezime ?? vlasnik.Prezime;
                if (v.Email != null)
                {
                    if (ValidacijaDodavanja(v, out status))
                        vlasnik.Email = v.Email;
                }
                if (v.KorisnickoIme != null)
                {
                    if (ValidacijaDodavanja(v, out status))
                        vlasnik.KorisnickoIme = v.KorisnickoIme;
                }
                if (v.Sifra != null)
                    vlasnik.Sifra = BCrypt.Net.BCrypt.HashPassword(v.Sifra);
                vlasnik.BrojTelefona = v.BrojTelefona ?? vlasnik.BrojTelefona;
                vlasnik.Grad = v.Grad ?? vlasnik.Grad;
                vlasnik.Adresa = v.Adresa ?? vlasnik.Adresa;

                unitOfWork.VlasnikRepository.Update(vlasnik);
                unitOfWork.SaveChanges();
                return vlasnik;
            }
            return null;
        }

        public string VratiSlikuVlasnika(int id)
        {
            Vlasnik v = unitOfWork.VlasnikRepository.Get(id);
            return v.Slika;
        }

        public void DodajSlikuVlasniku(int idVlasnik, string filename)
        {
            Vlasnik v = unitOfWork.VlasnikRepository.Get(idVlasnik);
            v.Slika = filename;
            unitOfWork.VlasnikRepository.Update(v);
            unitOfWork.SaveChanges();
        }

        public Vlasnik ObrisiVlasnika(int id)
        {
            Vlasnik v = unitOfWork.VlasnikRepository.Get(id);
            if (v != null)
            {
                unitOfWork.VlasnikRepository.Delete(v);
                unitOfWork.SaveChanges();
                return v;
            }
            return null;
        }

        public bool ValidacijaDodavanja(Vlasnik v, out StatusDodavanjaKorisnika status)
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
