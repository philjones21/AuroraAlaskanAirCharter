using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuroraAlaskanAirCharter.Migrations.CharterFlight
{
    public partial class CreateInitialCharterFlightSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SubTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Tax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MailToAddress1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    MailToAddress2 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    MailToAptSuite = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    MailToCity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MailToState = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    MailToZip = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MailToCountry = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    BillingAddress1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BillingAddress2 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    BillingAptSuite = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    BillingCity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BillingState = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    BillingZip = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    BillingCountry = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductId = table.Column<long>(type: "bigint", nullable: false),
                    ProductDesc = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AdditionalPassengerPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Misc1 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Misc2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Misc3 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Misc4 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "FlightReservation",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    FlightType = table.Column<int>(type: "int", nullable: false),
                    LandingSite = table.Column<int>(type: "int", nullable: false),
                    DepartureDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NumberOfPassengers = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightReservation_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    ProductId = table.Column<long>(type: "bigint", nullable: false),
                    ProductDesc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_DepartureDate_ReturnDate",
                table: "FlightReservation",
                columns: new[] { "DepartureDate", "ReturnDate" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_OrderId",
                table: "FlightReservation",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_OrderId",
                table: "OrderDetail",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_ProductId",
                table: "OrderDetail",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightReservation");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Product");
        }
    }
}
