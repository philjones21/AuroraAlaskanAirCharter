using System;
using System.ComponentModel.DataAnnotations;
using AuroraAlaskanAirCharter.Enums;

namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class FlightDetailViewModel
    {
        [Required]
        public FlightType FlightType { get; set; }
        [Range(0, 99)]
        public LandingSite LandingSite { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime DepartureDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime ReturnDate { get; set; }
        [Required]
        [Range(1, 99)]
        public int NumberOfPassengers { get; set; }
    }
}
