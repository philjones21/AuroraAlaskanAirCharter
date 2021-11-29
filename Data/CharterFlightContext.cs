using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AuroraAlaskanAirCharter.Models;

namespace AuroraAlaskanAirCharter.Data
{
    public class CharterFlightContext: DbContext
    {
        public CharterFlightContext(DbContextOptions<CharterFlightContext> options)
            : base(options)
        {
        }

        public DbSet<FlightReservation> FlightReservations { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FlightReservation>().ToTable("FlightReservation");
            modelBuilder.Entity<Order>().ToTable("Order");
            modelBuilder.Entity<OrderDetail>().ToTable("OrderDetail");
            modelBuilder.Entity<Product>().ToTable("Product");
        }
    }
}
