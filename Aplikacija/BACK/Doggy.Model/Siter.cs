using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.Model
{
    public class Siter : Korisnik
    {
        public Siter()
        {
            Recenzije = new List<Recenzija>();
        }

        public bool Validan { get; set; }

        public string Bio { get; set; }

        public string Slika { get; set; }

        public bool Dostupan { get; set; }

        public int BrObavljenihUsluga { get; set; }

        public double ProsecnaOcena { get; set; }

        public double CenaPoSatu { get; set; }

        public List<Recenzija> Recenzije { get; set; }
    }
}
