using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Doggy.DataLayer.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admini",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admini", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Siteri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Validan = table.Column<bool>(type: "bit", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dostupan = table.Column<bool>(type: "bit", nullable: false),
                    BrObavljenihUsluga = table.Column<int>(type: "int", nullable: false),
                    ProsecnaOcena = table.Column<double>(type: "float", nullable: false),
                    CenaPoSatu = table.Column<double>(type: "float", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Siteri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vlasnici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vlasnici", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Psi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rasa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Visina = table.Column<double>(type: "float", nullable: false),
                    Tezina = table.Column<double>(type: "float", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProsecnaOcena = table.Column<double>(type: "float", nullable: false),
                    VlasnikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Psi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Psi_Vlasnici_VlasnikId",
                        column: x => x.VlasnikId,
                        principalTable: "Vlasnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usluge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VlasnikId = table.Column<int>(type: "int", nullable: false),
                    SiterId = table.Column<int>(type: "int", nullable: false),
                    PasId = table.Column<int>(type: "int", nullable: false),
                    Vrsta = table.Column<int>(type: "int", nullable: false),
                    Pocetak = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Kraj = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdresaPreuzimanjaPsa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Napomena = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usluge", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usluge_Siteri_SiterId",
                        column: x => x.SiterId,
                        principalTable: "Siteri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Usluge_Vlasnici_VlasnikId",
                        column: x => x.VlasnikId,
                        principalTable: "Vlasnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recenzije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Komentar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ocena = table.Column<double>(type: "float", nullable: false),
                    SiterId = table.Column<int>(type: "int", nullable: false),
                    PasId = table.Column<int>(type: "int", nullable: false),
                    VlasnikId = table.Column<int>(type: "int", nullable: false),
                    Tip = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recenzije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recenzije_Psi_PasId",
                        column: x => x.PasId,
                        principalTable: "Psi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Recenzije_Siteri_SiterId",
                        column: x => x.SiterId,
                        principalTable: "Siteri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Psi_VlasnikId",
                table: "Psi",
                column: "VlasnikId");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_PasId",
                table: "Recenzije",
                column: "PasId");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_SiterId",
                table: "Recenzije",
                column: "SiterId");

            migrationBuilder.CreateIndex(
                name: "IX_Usluge_SiterId",
                table: "Usluge",
                column: "SiterId");

            migrationBuilder.CreateIndex(
                name: "IX_Usluge_VlasnikId",
                table: "Usluge",
                column: "VlasnikId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admini");

            migrationBuilder.DropTable(
                name: "Recenzije");

            migrationBuilder.DropTable(
                name: "Usluge");

            migrationBuilder.DropTable(
                name: "Psi");

            migrationBuilder.DropTable(
                name: "Siteri");

            migrationBuilder.DropTable(
                name: "Vlasnici");
        }
    }
}
