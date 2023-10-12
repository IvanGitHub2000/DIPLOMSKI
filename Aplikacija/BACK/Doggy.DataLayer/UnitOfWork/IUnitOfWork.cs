using Doggy.DataLayer.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.UnitOfWork
{
    public interface IUnitOfWork
    {
        IAdminRepository AdminRepository { get; }

        IPasRepository PasRepository { get; }

        IRecenzijaRepository RecenzijaRepository { get; }

        ISiterRepository SiterRepository { get; }

        IUslugaRepository UslugaRepository { get; }

        IVlasnikRepository VlasnikRepository { get; }

        void SaveChanges();

        void Rollback();
    }
}
