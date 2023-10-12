using Doggy.DataLayer.Repository.Interfaces;
using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Repository
{
    public class RecenzijaRepository : Repository<Recenzija>, IRecenzijaRepository
    {
        public RecenzijaRepository(DoggyContext context) : base(context)
        {

        }
    }
}
