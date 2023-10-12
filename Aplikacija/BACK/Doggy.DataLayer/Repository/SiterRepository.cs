using Doggy.DataLayer.Repository.Interfaces;
using Doggy.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Repository
{
    public class SiterRepository : Repository<Siter>, ISiterRepository
    {
        public SiterRepository(DoggyContext context) : base(context)
        {

        }

        public Siter VratiSiteraPoEmailu(string email)
        {
            return Find(k => k.Email == email).AsNoTracking().FirstOrDefault();
        }
    }
}
