using Doggy.DataLayer.Services;
using Doggy.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SiterController : ControllerBase
    {
        private readonly SiterService siterService;
        private readonly ImageService imageService;

        public SiterController(SiterService siterService, ImageService imageService)
        {
            this.siterService = siterService;
            this.imageService = imageService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveSitere")]
        public IActionResult VratiSveSitere()
        {
            return new JsonResult(siterService.VratiSveSitere());
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiNevalidneSitere")]
        public IActionResult VratiNevalidneSitere()
        {
            return new JsonResult(siterService.VratiNevalidneSitere());
        }

        [Authorize(Roles = "Siter,Admin,Vlasnik")]
        [HttpGet]
        [Route("vratiSveGradoveSvihSitera")]
        public IActionResult VratiSveGradoveSvihSitera()
        {
            return new JsonResult(siterService.VratiSveGradoveSvihSitera());
        }

        [Authorize(Roles = "Admin,Siter,Vlasnik")]
        [HttpGet]
        [Route("vratiSiteraPoId")]
        public IActionResult VratiSiteraPoId(int id)
        {
            return new JsonResult(siterService.VratiSiteraPoId(id));
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpGet]
        [Route("vratiSlikuSitera")]
        public IActionResult VratiSlikuSitera(int id)
        {
            try
            {
                String filename = this.siterService.VratiSlikuSitera(id);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpGet]
        [Route("filterSiteri")]
        public IActionResult VratiSitereFilter([FromQuery] string? ime, string? prezime, string? grad, bool? dostupan, int? minBrUsluga,double? minCena, double? maxCena, double? minOcena)
        {
            return new JsonResult(siterService.FilterSiteri(ime, prezime, grad,dostupan, minBrUsluga,minCena, maxCena, minOcena));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("dodajSitera")]
        public IActionResult DodajSitera([FromBody] Siter s)
        {
            StatusDodavanjaKorisnika status;
            var result = siterService.DodajSitera(s, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(401, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(402, "U bazi vec postoji neko sa tim korisnickim imenom!");

            return new JsonResult(result);
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpPost]
        [Route("dodajSlikuSiteru")]
        public async Task<ActionResult> DodajSlikuSiteru(int idSiter, IFormFile file)
        {
            try
            {
                String username = this.siterService.VratiSiteraPoId(idSiter).KorisnickoIme;
                String filename = await imageService.SaveFile(file, username);
                this.siterService.DodajSlikuSiteru(idSiter, filename);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
                //return Ok(new { url = msg });
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpDelete]
        [Route("obrisiSitera")]
        public IActionResult ObrisiSitera(int id)
        {
            Siter s = this.siterService.ObrisiSitera(id);
            return new JsonResult(s);
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpPut]
        [Route("azurirajSitera")]
        public IActionResult AzurirajSitera([FromBody] Siter s)
        {
            StatusDodavanjaKorisnika status;
            Siter siter = this.siterService.AzurirajSitera(s, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(401, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(402, "U bazi vec postoji neko sa tim korisnickim imenom!");
            return new JsonResult(siter);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("prihvatiSitera")]
        public IActionResult AzurirajSiteraValidan(int idSiter)
        {
            return new JsonResult(this.siterService.AzurirajSiteraValidan(idSiter));
        }

        [Authorize(Roles = "Admin,Siter")]
        [HttpPut]
        [Route("dostupan")]
        public IActionResult AzurirajSiteraDostupan(int idSiter)
        {
            return new JsonResult(this.siterService.AzurirajSiteraDostupan(idSiter));
        }
    }
}
