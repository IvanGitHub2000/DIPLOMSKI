﻿using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Repository.Interfaces
{
    public interface IVlasnikRepository : IRepository<Vlasnik>
    {
        public Vlasnik VratiVlasnikaPoEmailu(string email);

        public List<Vlasnik> VratiSveVlasnike();
    }
}
