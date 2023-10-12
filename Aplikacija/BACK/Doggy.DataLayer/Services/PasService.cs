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
    public class PasService : IPasService
    {
        private IUnitOfWork unitOfWork;

        public PasService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public List<Pas> VratiSvePse()
        {
            return unitOfWork.PasRepository.FindWithIncludes(k=>k.Id != 0 , k=> k.Recenzije).ToList();
        }

        public Pas VratiPsaPoId(int idPas)
        {
            return unitOfWork.PasRepository.Get(idPas);
        }

        public List<Pas> VratiPseZaVlasnika(int idVlasnika)
        {
            return unitOfWork.PasRepository.Find(k => k.VlasnikId == idVlasnika).ToList();
        }
        public string VratiSlikuPsa(int id)
        {
            Pas p = unitOfWork.PasRepository.Get(id);
            return p.Slika;
        }

        public Pas DodajPsa(Pas p)
        {
            var provera = unitOfWork.PasRepository.Find(k => k.Ime == p.Ime && k.VlasnikId == p.VlasnikId).FirstOrDefault();
            if(provera!=null)
                return null;

            p.Slika = "defaultPas.jpg";
            var pas = unitOfWork.PasRepository.Add(p);
            unitOfWork.SaveChanges();
            return pas;
        }

        public void dodajSlikuPsu(int idPas, string filename)
        {
            Pas p = unitOfWork.PasRepository.Get(idPas);
            p.Slika = filename;
            unitOfWork.PasRepository.Update(p);
            unitOfWork.SaveChanges();
        }


        public Pas ObrisiPsa(int id)
        {
            Pas p = unitOfWork.PasRepository.Get(id);
            if (p != null)
            {
                List<Usluga> uslugeZaPsa = unitOfWork.UslugaRepository.Find(k => k.PasId == id).ToList();
                unitOfWork.UslugaRepository.DeleteRange(uslugeZaPsa);
                unitOfWork.PasRepository.Delete(p);
                unitOfWork.SaveChanges();
                return p;
            }
            return null;
        }

        public Pas AzurirajPsa(Pas p)
        {
            Pas pas = unitOfWork.PasRepository.Get(p.Id);
            if (pas != null)
            {
                pas.Ime = p.Ime ?? pas.Ime;
                pas.Rasa = p.Rasa ?? pas.Rasa;
                pas.Pol = p.Pol ?? pas.Pol;
                pas.Opis = p.Opis ?? pas.Opis;
                if (p.Visina != 0)
                    pas.Visina = p.Visina;
                if (p.Tezina != 0)
                    pas.Tezina = p.Tezina;

                unitOfWork.PasRepository.Update(pas);
                unitOfWork.SaveChanges();
                return pas;
            }
            return null;
        }

    }
}
