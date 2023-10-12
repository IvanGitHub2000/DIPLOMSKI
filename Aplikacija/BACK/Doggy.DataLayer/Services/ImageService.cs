using Doggy.DataLayer.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.DataLayer.Services
{
    public class ImageService : IImageService
    {
        //private UnitOfWork.UnitOfWork unitOfWork;

        public ImageService()
        {
            //this.unitOfWork = new UnitOfWork.UnitOfWork(context);
        }

        public async Task<String> SaveFile(IFormFile file, String user = "")
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles");
            string filename = "image_" + user + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(file.FileName);
            using (var stream = new FileStream(Path.Combine(path, filename), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //return $"https://localhost:7274/files/vratisliku/{filename}";
            return filename;
        }
    }
}
