using System;
using System.ComponentModel.DataAnnotations;
using AuroraAlaskanAirCharter.Enums;
using Microsoft.EntityFrameworkCore;

namespace AuroraAlaskanAirCharter.Models
{
    [Index(nameof(DepartureDate), nameof(ReturnDate), IsUnique = true)]
    public class FlightReservation
    {
        public long Id { get; set; }
        public long OrderId { get; set; }

        [Required]
        [Range(0, 99)]
        public FlightType FlightType { get; set; }

        [Required]
        [Range(0, 99)]
        public LandingSite LandingSite { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DepartureDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ReturnDate { get; set; }

        [Required]
        [Range(1, 99)]
        public int NumberOfPassengers { get; set; }

        public Order Order { get; set; }
    }
}
