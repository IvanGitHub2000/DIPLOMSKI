using Microsoft.EntityFrameworkCore.Migrations;

namespace Doggy.DataLayer.Migrations
{
    public partial class m2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Tip",
                table: "Vlasnici",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tip",
                table: "Siteri",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tip",
                table: "Admini",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tip",
                table: "Vlasnici");

            migrationBuilder.DropColumn(
                name: "Tip",
                table: "Siteri");

            migrationBuilder.DropColumn(
                name: "Tip",
                table: "Admini");
        }
    }
}
