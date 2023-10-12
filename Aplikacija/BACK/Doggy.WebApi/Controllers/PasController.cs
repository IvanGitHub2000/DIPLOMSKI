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
    public class PasController : ControllerBase
    {
        private readonly PasService pasService;
        private readonly ImageService imageService;

        public PasController(PasService pasService, ImageService imageService)
        {
            this.pasService = pasService;
            this.imageService = imageService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSvePse")]
        public IActionResult VratiSvePse()
        {
            return new JsonResult(pasService.VratiSvePse());
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpGet]
        [Route("vratiPseZaVlasnika")]
        public IActionResult VratiPseZaVlasnika(int idVlasnika)
        {
            return new JsonResult(pasService.VratiPseZaVlasnika(idVlasnika));
        }

        [Authorize(Roles = "Admin,Vlasnik,Siter")]
        [HttpGet]
        [Route("vratiPsaPoId")]
        public IActionResult VratiPsaPoId(int idPas)
        {
            return new JsonResult(pasService.VratiPsaPoId(idPas));
        }

        [Authorize(Roles = "Vlasnik")]
        [HttpGet]
        [Route("vratiSlikuPsa")]
        public IActionResult VratiSlikuPsa(int id)
        {
            try
            {
                String filename = this.pasService.VratiSlikuPsa(id);
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
        [Route("dodajPsa")]
        public IActionResult DodajPsa([FromBody] Pas p)
        {
            Pas pas = pasService.DodajPsa(p);
            if (pas == null)
                return BadRequest("Vlasnik vec ima psa sa tim imenom!"); 

            return new JsonResult(pas);
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpPost]
        [Route("dodajSlikuPsu")]
        public async Task<ActionResult> dodajSlikuPsu(int idPas, IFormFile file)
        {
            try
            {
                String username = this.pasService.VratiPsaPoId(idPas).Ime;
                String filename = await imageService.SaveFile(file, username);
                this.pasService.dodajSlikuPsu(idPas, filename);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
                //return Ok(new { url = msg });
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpDelete]
        [Route("obrisiPsa")]
        public IActionResult ObrisiPsa(int id)
        {
            Pas p = this.pasService.ObrisiPsa(id);
            return new JsonResult(p);
        }

        [Authorize(Roles = "Admin,Vlasnik")]
        [HttpPut]
        [Route("azurirajPsa")]
        public IActionResult AzurirajPsa([FromBody] Pas p)
        {
            return new JsonResult(this.pasService.AzurirajPsa(p));
        }
    }
}
