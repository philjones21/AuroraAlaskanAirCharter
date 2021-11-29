using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class PricingViewModel
    {
        [Required]
        public decimal Total { get; set; }
        [Required]
        public decimal SubTotal { get; set; }
        [Required]
        public decimal Tax { get; set; }
    }
}
