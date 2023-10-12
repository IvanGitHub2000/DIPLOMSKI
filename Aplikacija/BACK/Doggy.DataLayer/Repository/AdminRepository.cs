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
    public class AdminRepository : Repository<Admin>, IAdminRepository
    {
        public AdminRepository(DoggyContext context) : base(context)
        {
        }

        public Admin VratiAdminaPoEmailu(string email)
        {
            return Find(k => k.Email == email).AsNoTracking().FirstOrDefault();
        }
    }
}
