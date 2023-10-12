using Doggy.DataLayer.Repository;
using Doggy.DataLayer.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private DoggyContext context;

        public UnitOfWork(DoggyContext context)
        {
            this.context = context;
        }

        private IAdminRepository adminRepository;
        public IAdminRepository AdminRepository
        {
            get
            {
                if (adminRepository == null)
                {
                    adminRepository = new AdminRepository(context);
                }
                return adminRepository;
            }
        }

        private IPasRepository pasRepository;
        public IPasRepository PasRepository
        {
            get
            {
                if (pasRepository == null)
                {
                    pasRepository = new PasRepository(context);
                }
                return pasRepository;
            }
        }

        private IRecenzijaRepository recenzijaRepository;
        public IRecenzijaRepository RecenzijaRepository
        {
            get
            {
                if (recenzijaRepository == null)
                {
                    recenzijaRepository = new RecenzijaRepository(context);
                }
                return recenzijaRepository;
            }
        }

        private ISiterRepository siterRepository;
        public ISiterRepository SiterRepository
        {
            get
            {
                if (siterRepository == null)
                {
                    siterRepository = new SiterRepository(context);
                }
                return siterRepository;
            }
        }

        private IUslugaRepository uslugaRepository;
        public IUslugaRepository UslugaRepository
        {
            get
            {
                if (uslugaRepository == null)
                {
                    uslugaRepository = new UslugaRepository(context);
                }
                return uslugaRepository;
            }
        }

        private IVlasnikRepository vlasnikRepository;
        public IVlasnikRepository VlasnikRepository
        {
            get
            {
                if (vlasnikRepository == null)
                {
                    vlasnikRepository = new VlasnikRepository(context);
                }
                return vlasnikRepository;
            }
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }

        public void Rollback()
        {
            this.context.Dispose();
        }
    }
}
