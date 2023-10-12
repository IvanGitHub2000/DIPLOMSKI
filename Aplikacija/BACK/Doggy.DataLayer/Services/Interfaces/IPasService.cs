using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services.Interfaces
{
    public interface IPasService
    {
        public List<Pas> VratiPseZaVlasnika(int idVlasnika);
        public List<Pas> VratiSvePse();
        public Pas DodajPsa(Pas p);
        public Pas ObrisiPsa(int id);
        public Pas AzurirajPsa(Pas p);
    }
}
