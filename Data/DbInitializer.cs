using System.Linq;
using AuroraAlaskanAirCharter.Models;

namespace AuroraAlaskanAirCharter.Data
{
    public class DbInitializer
    {
        public static void Initialize(CharterFlightContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Products.Any())
            {
                return;   // DB has been seeded
            }

            var Products = new Product[]
            {
                new Product { ProductId = 1, ProductDesc = "Flight Seeing", Active=true, Price = 500.00m, AdditionalPassengerPrice = 50.00m },
                new Product { ProductId = 2, ProductDesc = "Glacier Landing", Active=true, Price = 850.00m, AdditionalPassengerPrice = 150.00m }
            };
            foreach (Product p in Products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();
        }
    }
}