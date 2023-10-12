using Doggy.DataLayer.Services;
using Doggy.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VlasnikController : ControllerBase
    {
        private readonly VlasnikService vlasnikService;
        private readonly ImageService imageService;

        public VlasnikController(VlasnikService vlasnikService, ImageService imageService)
        {
            this.vlasnikService = vlasnikService;
            this.imageService = imageService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveVlasnike")]
        public IActionResult VratiSveVlasnike()
        {
            return new JsonResult(vlasnikService.VratiSveVlasnike());
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpGet]
        [Route("vratiVlasnikaPoId")]
        public IActionResult VratiVlasnikaPoId(int id)
        {
            return new JsonResult(vlasnikService.VratiVlasnikaPoId(id));
        }

        [Authorize(Roles = "Admin,Vlasnik,Siter")]
        [HttpGet]
        [Route("vratiSlikuVlasnika")]
        public IActionResult VratiSlikuVlasnika(int id)
        {
            try
            {
                String filename = this.vlasnikService.VratiSlikuVlasnika(id);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpPost]
        [Route("dodajSlikuVlasniku")]
        public async Task<ActionResult> DodajSlikuVlasniku(int idVlasnik, IFormFile file)
        {
            try
            {
                String username = this.vlasnikService.VratiVlasnikaPoId(idVlasnik).KorisnickoIme;
                String filename = await imageService.SaveFile(file, username);
                this.vlasnikService.DodajSlikuVlasniku(idVlasnik, filename);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("dodajVlasnika")]
        public IActionResult DodajVlasnika([FromBody] Vlasnik v)
        {
            StatusDodavanjaKorisnika status;
            var result = vlasnikService.DodajVlasnika(v, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(501, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(502, "U bazi vec postoji neko sa tim korisnickim imenom!");

            return new JsonResult(result);
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpDelete]
        [Route("obrisiVlasnika")]
        public IActionResult ObrisiVlasnika(int id)
        {
            Vlasnik v = this.vlasnikService.ObrisiVlasnika(id);
            return new JsonResult(v);
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpPut]
        [Route("azurirajVlasnika")]
        public IActionResult AzurirajVlasnika([FromBody] Vlasnik v)
        {
            StatusDodavanjaKorisnika status;
            Vlasnik vlasnik = this. vlasnikService.AzurirajVlasnika(v, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(401, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(402, "U bazi vec postoji neko sa tim korisnickim imenom!");
            return new JsonResult(vlasnik);
        }

    }
}
