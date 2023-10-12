using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Doggy.Model
{
    public class Pas
    {

        public Pas()
        {
            Recenzije = new List<Recenzija>();
        }


        public int Id { get; set; }

        public string Ime { get; set; }

        public string Rasa { get; set; }

        public string Pol { get; set; }

        public string Opis { get; set; }

        public double Visina { get; set; }

        public double Tezina { get; set; }

        public string Slika { get; set; }

        public double ProsecnaOcena { get; set; }

        [JsonIgnore]
        public Vlasnik Vlasnik { get; set; }

        public int VlasnikId { get; set; }

        //[JsonIgnore]
        public List<Recenzija> Recenzije { get; set; }
    }
}
