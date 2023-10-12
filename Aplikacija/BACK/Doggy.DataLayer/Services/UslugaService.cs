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
    public class UslugaService : IUslugaService
    {

        private IUnitOfWork unitOfWork;

        public UslugaService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Usluga> VratiSveUsluge()
        {
            
             return unitOfWork.UslugaRepository.All().ToList();
        }

        public List<Usluga> VratiUslugeVlasniku(int idVlasnika)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.VlasnikId == idVlasnika, k => k.Siter).ToList();
        }

        public List<Usluga> VratiUslugeSiteru(int idSitera)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.SiterId == idSitera && k.Status != StatusUsluge.Odbijena, k => k.Vlasnik).ToList();
        }

        public List<Usluga> vratiUslugeSiteruZaPsa(int idSitera, int idPsa)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.SiterId == idSitera && k.PasId == idPsa && k.Status != StatusUsluge.Odbijena, k => k.Vlasnik).ToList();
        } 

        public object vratiUslugeVlasnikuZaPsa(int idVlasnika, int idPsa)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.VlasnikId == idVlasnika && k.PasId == idPsa, k => k.Siter).ToList();
        }


        public List<Usluga> VratiUslugeVlasnikuPoStatusuSaPsom(int idVlasnika, StatusUsluge status, out List<Pas> psi)
        {
            var usluge = unitOfWork.UslugaRepository.FindWithIncludes(k => k.VlasnikId == idVlasnika && k.Status == status, k => k.Siter).ToList();
            List<int> listaId = new List<int>();
            List<Pas> psi1 = new List<Pas>();
            psi = new List<Pas>();
            usluge.ForEach(k => listaId.Add(k.PasId));
            listaId.ForEach(k => psi1.Add(unitOfWork.PasRepository.Get(k)));
            psi = psi1;
            return usluge;

        }

        public List<Usluga> VratiUslugeVlasnikuPoStatusu(int idVlasnika, StatusUsluge status)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.VlasnikId == idVlasnika && k.Status == status, k => k.Siter).ToList();
        }

        public List<Usluga> VratiUslugeSiteruPoStatusu(int idSitera, StatusUsluge status)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.SiterId == idSitera && k.Status == status, k => k.Vlasnik).ToList();
        }

        public Usluga DodajUslugu(Usluga u)
        {
            var provera = unitOfWork.UslugaRepository.Find(k => k.SiterId == u.SiterId && 
                                                                ((u.Pocetak >= k.Pocetak && u.Pocetak < k.Kraj) ||
                                                                (u.Kraj > k.Pocetak && u.Kraj <= k.Kraj)))
                                                                .FirstOrDefault();
            if (provera != null)
                return null;

            var usluga = unitOfWork.UslugaRepository.Add(u);
            unitOfWork.SaveChanges();
            return usluga;
        }


        public Usluga ObrisiUslugu(int id)
        {
            Usluga u = unitOfWork.UslugaRepository.Get(id);
            if (u != null)
            {
                unitOfWork.UslugaRepository.Delete(u);
                unitOfWork.SaveChanges();
                return u;
            }
            return null;
        }

        //public Usluga AzurirajUslugu(Usluga u)
        //{
        //    Usluga usluga = unitOfWork.UslugaRepository.Get(u.Id);
        //    if (usluga != null)
        //    {
        //        usluga.Vrsta = u.Vrsta ?? usluga.Vrsta;
        //        if(usluga.Pocetak != DateTime.MinValue)
        //            usluga.Pocetak = u.Pocetak

        //        unitOfWork.UslugaRepository.Update(usluga);
        //        unitOfWork.SaveChanges();
        //        return usluga;
        //    }
        //    return null;
        //}

        public Usluga AzurirajStatusUsluge(int idUsluge, StatusUsluge status)
        {
            Usluga u = unitOfWork.UslugaRepository.FindWithIncludes(k => k.Id == idUsluge, k => k.Siter).FirstOrDefault();

            if (u == null)
                return null;

            u.Status = status;

            if(status == StatusUsluge.Obavljena)
            {
                u.Siter.BrObavljenihUsluga++;
            }

            unitOfWork.UslugaRepository.Update(u);
            unitOfWork.SaveChanges();
            return u;
        }
    }
}
