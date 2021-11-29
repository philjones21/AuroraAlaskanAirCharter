using Microsoft.EntityFrameworkCore.Migrations;

namespace AuroraAlaskanAirCharter.Migrations.CharterFlight
{
    public partial class SeedDataToProductTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO Product (ProductId, ProductDesc, Active, Price, AdditionalPassengerPrice)
                                        VALUES (1, 'Flight Seeing', 'true', 500.00, 50.00);
                                   INSERT INTO Product (ProductId, ProductDesc, Active, Price, AdditionalPassengerPrice)
                                        VALUES (2, 'Glacier Landing', 'true', 850.00, 150.00);");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
