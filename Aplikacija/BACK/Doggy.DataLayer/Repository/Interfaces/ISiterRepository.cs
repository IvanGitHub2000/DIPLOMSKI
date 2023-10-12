using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Repository.Interfaces
{
    public interface ISiterRepository : IRepository<Siter>
    {
        public Siter VratiSiteraPoEmailu(string email);

    }
}
