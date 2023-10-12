using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services.Interfaces
{
    public interface IVlasnikService
    {
        public List<Vlasnik> VratiSveVlasnike();
        public Vlasnik DodajVlasnika(Vlasnik s, out StatusDodavanjaKorisnika status);
        public Vlasnik ObrisiVlasnika(int id);
        public bool ValidacijaDodavanja(Vlasnik v, out StatusDodavanjaKorisnika status);
        public Vlasnik AzurirajVlasnika(Vlasnik v, out StatusDodavanjaKorisnika status);
    }
}
