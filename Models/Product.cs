using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuroraAlaskanAirCharter.Models
{
    public class Product
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public long ProductId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ProductDesc { get; set; }
        [Required]
        public bool Active { get; set; }
  
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [DataType(DataType.Currency)]
        public decimal AdditionalPassengerPrice { get; set; }

        [MaxLength(100)]
        public string Misc1 { get; set; }

        [MaxLength(100)]
        public string Misc2 { get; set; }

        [MaxLength(100)]
        public string Misc3 { get; set; }

        [MaxLength(100)]
        public string Misc4 { get; set; }

    }
}
