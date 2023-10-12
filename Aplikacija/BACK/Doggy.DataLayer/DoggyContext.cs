using Doggy.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer
{
    public class DoggyContext : DbContext
    {
        public DoggyContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Admin> Admini { get; set; }

        public DbSet<Pas> Psi { get; set; }

        public DbSet<Recenzija> Recenzije { get; set; }

        public DbSet<Siter> Siteri { get; set; }

        public DbSet<Vlasnik> Vlasnici { get; set; }

        public DbSet<Usluga> Usluge { get; set; }
    }
}
