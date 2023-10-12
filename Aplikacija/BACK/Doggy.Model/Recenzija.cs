using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.Model
{
    public enum TipRecenzije
    {
        Siter,
        Pas
    };
    public class Recenzija
    {
        public int Id { get; set; }

        public DateTime Vreme { get; set; }

        public string Komentar { get; set; }

        public double Ocena { get; set; }

        //public Siter Siter { get; set; }

        public int SiterId { get; set; }

        //public Pas Pas { get; set; } // ja msm ne treba

        public int PasId { get; set; }

        public int VlasnikId { get; set; }

        public TipRecenzije Tip { get; set; }
    }
}
