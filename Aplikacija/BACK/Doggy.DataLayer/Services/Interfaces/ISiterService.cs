using Doggy.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services.Interfaces
{
    public interface ISiterService
    {
        public List<Siter> VratiSveSitere();
        public List<Siter> FilterSiteri(string? ime, string? prezime, string? grad, bool? dostupan, int? minBrUsluga, double? minCena, double? maxCena, double? minOcena);
        public Siter DodajSitera(Siter s, out StatusDodavanjaKorisnika status);
        public Siter ObrisiSitera(int id);
        public Siter AzurirajSiteraValidan(int idSiter);
        public Siter AzurirajSiteraDostupan(int idSiter);
        public bool ValidacijaDodavanja(Siter s, out StatusDodavanjaKorisnika status);
        public Siter AzurirajSitera(Siter s, out StatusDodavanjaKorisnika status);
    }
}
