using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models
{
    public class OrderDetail
    {
        public long Id { get; set; }

        public long OrderId { get; set; }

        public long ProductId { get; set; }

        [Required]
        [MaxLength(50)]
        public string ProductDesc { get; set; }

        [DataType(DataType.Currency)]
        public decimal Total { get; set; }

        public int Quantity { get; set; }

        public Order Order { get; set; }

        public Product Product { get; set; }
    }
}
