using System;
using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class OrderHistoryViewModel
    {
        [Required]
        public long OrderId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(50)]
        public string ProductDesc { get; set; }
        [Required]
        [DataType(DataType.Currency)]
        public decimal Total { get; set; }
        public int Quantity { get; set; }
    }
}
