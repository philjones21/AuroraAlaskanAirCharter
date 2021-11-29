using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;


namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class PaymentIntentResponseViewModel
    {
        [Required]
        public string ClientSecret { get; set; }
        [Required]
        public PricingViewModel Pricing { get; set; }
    }
}
