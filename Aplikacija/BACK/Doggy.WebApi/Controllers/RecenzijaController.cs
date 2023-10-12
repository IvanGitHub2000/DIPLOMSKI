using Doggy.DataLayer.Services;
using Doggy.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecenzijaController : ControllerBase
    {
        private readonly RecenzijaService recenzijaService;

        public RecenzijaController(RecenzijaService recenzijaService)
        {
            this.recenzijaService = recenzijaService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveRecenzije")]
        public IActionResult VratiSveRecenzije()
        {
            return new JsonResult(recenzijaService.VratiSveRecenzije());
        }

        [Authorize(Roles = "Admin,Vlasnik,Siter")]
        [HttpGet]
        [Route("vratiRecenzijuPoId")]
        public IActionResult VratiRecenzijuPoId(int id)
        {
            return new JsonResult(recenzijaService.VratiRecenzijuPoId(id));
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpGet]
        [Route("vratiRecenzijeZaSitera")]
        public IActionResult VratiRecenzijeZaSitera(int id)
        {
            return new JsonResult(recenzijaService.VratiRecenzijeZaSitera(id));
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpGet]
        [Route("vratiRecenzijeZaPsa")]
        public IActionResult VratiRecenzijeZaPsa(int id)
        {
            return new JsonResult(recenzijaService.VratiRecenzijeZaPsa(id));
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpPost]
        [Route("dodajRecenzijuSiteru")]
        public IActionResult DodajRecenzijuSiteru([FromBody] Recenzija r)
        {
            Recenzija recenzija = recenzijaService.DodajRecenzijuSiteru(r);
            //if (recenzija == null)
            //    return BadRequest("Vec ste pisali recenziju za ovog sitera za setanje ovog psa!");

            return new JsonResult(recenzija);
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpPost]
        [Route("dodajRecenzijuPsu")]
        public IActionResult DodajRecenzijuPsu([FromBody] Recenzija r)
        {
            Recenzija recenzija = recenzijaService.DodajRecenzijuPsu(r);
            //if (recenzija == null)
            //    return BadRequest("Vec ste pisali recenziju za ovog psa!");

            return new JsonResult(recenzija);
        }

        [Authorize(Roles = "Admin,Vlasnik,Siter")]
        [HttpDelete]
        [Route("obrisiRecenziju")]
        public IActionResult ObrisiRecenziju(int idRecenzija)
        {
            Recenzija r = this.recenzijaService.ObrisiRecenziju(idRecenzija);
            return new JsonResult(r);
        }

        [Authorize(Roles = "Admin,Vlasnik,Siter")]
        [HttpPut]
        [Route("azurirajRecenziju")]
        public IActionResult AzurirajRecenziju(Recenzija r)
        {
            return new JsonResult(this.recenzijaService.AzurirajRecenziju(r));
        }

    }
}
