using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Doggy.Model
{
    public class Vlasnik : Korisnik
    {
        public Vlasnik()
        {
            Psi = new List<Pas>();
        }

        //[JsonIgnore]
        public List<Pas> Psi { get; set; }

        public String Slika { get; set; }
    }
}
