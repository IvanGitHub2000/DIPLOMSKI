using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.Model
{
    public enum VrstaUsluge
    {
        Setnja,
        CuvanjeKodVlasnika,
        PosetaSitera,
        CuvanjePsaKodSitera
    };

    public enum StatusUsluge
    {
        Zahtev,
        Prihvacena,
        Odbijena,
        Obavljena
    };

    public class Usluga
    {
        public int Id { get; set; }

        public Vlasnik Vlasnik { get; set; }

        public int VlasnikId { get; set; }

        public Siter Siter { get; set; }

        public int SiterId { get; set; }
        
        //public Pas Pas { get; set; }

        public int PasId { get; set; }

        public VrstaUsluge Vrsta { get; set; }

        public DateTime Pocetak { get; set; }

        public DateTime Kraj { get; set; }

        public string AdresaPreuzimanjaPsa { get; set; }

        public string Napomena { get; set; }

        public StatusUsluge Status { get; set; }

    }
}
