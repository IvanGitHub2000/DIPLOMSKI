using Doggy.DataLayer;
using Doggy.DataLayer.Repository;
using Doggy.DataLayer.Repository.Interfaces;
using Doggy.DataLayer.Services;
using Doggy.DataLayer.Services.Interfaces;
using Doggy.DataLayer.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Doggy.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<DoggyContext>(conf =>
            {
                conf.UseSqlServer(Configuration.GetConnectionString("Konekcija"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CORS", builder =>
                {
                    builder.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed((host) => true).AllowCredentials();
                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Doggy.WebApi", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme {
                            Reference = new OpenApiReference {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                            }
                    },
                        new string[] {}
                    }
                });
            });


            SetupJWTServices(services);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<AdminService>();
            services.AddScoped<PasService>();
            services.AddScoped<RecenzijaService>();
            services.AddScoped<SiterService>();
            services.AddScoped<UslugaService>();
            services.AddScoped<VlasnikService>();
            services.AddScoped<AuthService>();
            services.AddScoped<ImageService>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IPasRepository, PasRepository>();
            services.AddScoped<IRecenzijaRepository, RecenzijaRepository>();
            services.AddScoped<ISiterRepository, SiterRepository>();
            services.AddScoped<IUslugaRepository, UslugaRepository>();
            services.AddScoped<IVlasnikRepository, VlasnikRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Doggy.WebApi v1"));
            }

            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles")),
                RequestPath = "/StaticFiles",
                EnableDefaultFiles = true
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CORS");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void SetupJWTServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var authService = context.HttpContext.RequestServices.GetRequiredService<AuthService>();
                        var email = context.Principal.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault().Value;
                        var user = authService.VratiKorisnikaPoEmailu(email);
                        if (user == null)
                        {
                            context.Fail("Unauthorized");
                        }
                        else
                        {
                            //var claims = (ClaimsIdentity)context.Principal.Identity;
                            //var userType = nameof(user);
                            //Claim role = new Claim(ClaimTypes.Role, userType);
                            //claims.AddClaim(role);
                            context.Success();
                        }
                    }
                };
            });
        }
    }
}
