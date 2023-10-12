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
    public class RecenzijaService : IRecenzijaService
    {
        private IUnitOfWork unitOfWork;

        public RecenzijaService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public List<Recenzija> VratiSveRecenzije()
        {
            return unitOfWork.RecenzijaRepository.All().ToList();
        }
        public Recenzija VratiRecenzijuPoId(int id)
        {
            return unitOfWork.RecenzijaRepository.Get(id);
        }
        public List<Recenzija> VratiRecenzijeZaPsa(int id)
        {
            Pas pas = unitOfWork.PasRepository.FindWithIncludes(k => k.Id == id, k => k.Recenzije).FirstOrDefault();
            return pas.Recenzije.Where(k => k.Tip == TipRecenzije.Pas).ToList();
        }
        public List<Recenzija> VratiRecenzijeZaSitera(int id)
        {
            Siter siter = unitOfWork.SiterRepository.FindWithIncludes(k => k.Id == id, k => k.Recenzije).FirstOrDefault();
            return siter.Recenzije.Where(k => k.Tip == TipRecenzije.Siter).ToList();
        }

        public Recenzija DodajRecenzijuSiteru(Recenzija r)
        {
            var siter = unitOfWork.SiterRepository.FindWithIncludes(k => k.Id == r.SiterId, k => k.Recenzije).FirstOrDefault();

            //var provera = siter.Recenzije.Find(k => k.VlasnikId == r.VlasnikId && k.PasId == r.PasId && k.Tip == TipRecenzije.Siter);
            //if (provera != null)
            //    return null;

            r.Tip = TipRecenzije.Siter;
            r.Vreme = DateTime.Now;
            siter.Recenzije.Add(r);

            List<Recenzija> recenzije = siter.Recenzije.Where(k => k.Tip == TipRecenzije.Siter).ToList();

            double suma = 0;
            recenzije.ForEach(k => suma += k.Ocena);
            siter.ProsecnaOcena = suma / recenzije.Count;

            unitOfWork.SiterRepository.Update(siter);
            unitOfWork.SaveChanges();
            return r;
        }


        public Recenzija DodajRecenzijuPsu(Recenzija r)
        {
            var pas = unitOfWork.PasRepository.FindWithIncludes(k => k.Id == r.PasId, k => k.Recenzije).FirstOrDefault();

            //var provera = pas.Recenzije.Find(k => k.SiterId == r.SiterId && k.Tip == TipRecenzije.Pas);
            //if (provera != null)
            //    return null;

            r.Tip = TipRecenzije.Pas;
            r.Vreme = DateTime.Now;
            pas.Recenzije.Add(r);

            List<Recenzija> recenzije = pas.Recenzije.Where(k => k.Tip == TipRecenzije.Pas).ToList();

            double suma = 0;
            recenzije.ForEach(k => suma += k.Ocena);
            pas.ProsecnaOcena = suma / recenzije.Count;


            unitOfWork.PasRepository.Update(pas);
            unitOfWork.SaveChanges();
            return r;
        }

        public Recenzija ObrisiRecenziju(int idRecenzija)
        {
            Recenzija r = unitOfWork.RecenzijaRepository.Get(idRecenzija);
            if (r != null)
            {
                if (r.Tip == TipRecenzije.Siter)
                {
                    Siter siter = unitOfWork.SiterRepository.FindWithIncludes(k => k.Id == r.SiterId, k => k.Recenzije).FirstOrDefault();
                    List<Recenzija> recenzije = siter.Recenzije.Where(k => k.Tip == TipRecenzije.Siter).ToList();

                    if (recenzije.Count != 1)
                    {
                        double suma = 0;
                        recenzije.ForEach(k => suma += k.Ocena);
                        suma -= r.Ocena;
                        siter.ProsecnaOcena = suma / (recenzije.Count - 1);
                    }
                    else
                    {
                        siter.ProsecnaOcena = 0;
                    }

                    unitOfWork.SiterRepository.Update(siter);
                    unitOfWork.SaveChanges();
                }
                else
                {
                    Pas pas = unitOfWork.PasRepository.FindWithIncludes(k => k.Id == r.PasId, k => k.Recenzije).FirstOrDefault();
                    List<Recenzija> recenzije = pas.Recenzije.Where(k => k.Tip == TipRecenzije.Pas).ToList();

                    if (recenzije.Count != 1)
                    {
                        double suma = 0;
                        recenzije.ForEach(k => suma += k.Ocena);
                        suma -= r.Ocena;
                        pas.ProsecnaOcena = suma / (recenzije.Count - 1);
                    }
                    else
                    {
                        pas.ProsecnaOcena = 0;
                    }

                    unitOfWork.PasRepository.Update(pas);
                    unitOfWork.SaveChanges();
                }

                unitOfWork.RecenzijaRepository.Delete(r);
                unitOfWork.SaveChanges();
                return r;
            }
            return null;
        }

        public Recenzija AzurirajRecenziju(Recenzija r)
        {
            Recenzija recenzija = unitOfWork.RecenzijaRepository.Get(r.Id);
            if (recenzija != null)
            {
                recenzija.Komentar = r.Komentar ?? recenzija.Komentar;
                if (r.Ocena != 0)
                {
                    recenzija.Ocena = r.Ocena;
                    if (recenzija.Tip == TipRecenzije.Siter)
                    {
                        Siter siter = unitOfWork.SiterRepository.FindWithIncludes(k => k.Id == recenzija.SiterId, k => k.Recenzije).FirstOrDefault();
                        List<Recenzija> recenzije = siter.Recenzije.Where(k => k.Tip == TipRecenzije.Siter).ToList();

                        double suma = 0;
                        recenzije.ForEach(k => suma += k.Ocena);
                        siter.ProsecnaOcena = suma / recenzije.Count;

                        unitOfWork.SiterRepository.Update(siter);
                        unitOfWork.SaveChanges();
                    }
                    else
                    {
                        Pas pas = unitOfWork.PasRepository.FindWithIncludes(k => k.Id == recenzija.PasId, k => k.Recenzije).FirstOrDefault();
                        List<Recenzija> recenzije = pas.Recenzije.Where(k => k.Tip == TipRecenzije.Pas).ToList();

                        double suma = 0;
                        recenzije.ForEach(k => suma += k.Ocena);
                        pas.ProsecnaOcena = suma / recenzije.Count;

                        unitOfWork.PasRepository.Update(pas);
                        unitOfWork.SaveChanges();
                    }
                }

                recenzija.Vreme = DateTime.Now;

                unitOfWork.RecenzijaRepository.Update(recenzija);
                unitOfWork.SaveChanges();
                return recenzija;
            }
            return null;
        }

    }
}
