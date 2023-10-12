using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services.Interfaces
{
    public interface IUslugaService
    {
        public Usluga AzurirajStatusUsluge(int idUsluge, StatusUsluge status);
        public Usluga DodajUslugu(Usluga u);
        public Usluga ObrisiUslugu(int id);
        public List<Usluga> VratiSveUsluge();
        public List<Usluga> VratiUslugeSiteru(int idSitera);
        public List<Usluga> VratiUslugeSiteruPoStatusu(int idSitera, StatusUsluge status);
        public List<Usluga> VratiUslugeVlasniku(int idVlasnika);
        public List<Usluga> VratiUslugeVlasnikuPoStatusuSaPsom(int idVlasnika, StatusUsluge status, out List<Pas> psi);
        public List<Usluga> VratiUslugeVlasnikuPoStatusu(int idVlasnika, StatusUsluge status);
    }
}
