using System;
using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class ReservedDateViewModel
    {
        [Required]
        public int Year { get; set; }
        [Required]
        public int Month { get; set; }
        public int Day { get; set; }
    }
}
