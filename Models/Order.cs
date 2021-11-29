using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models
{
    public class Order
    {
        public long OrderId { get; set; }

        [Required]
        public Guid ReferenceId { get; set; }

        [Required]
        public string ApplicationUserId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OrderDate { get; set; }

        [DataType(DataType.Currency)]
        public decimal SubTotal { get; set; }

        [DataType(DataType.Currency)]
        public decimal Total { get; set; }

        [DataType(DataType.Currency)]
        public decimal Tax { get; set; }

        [Required]
        [MaxLength(30)]
        public string MailToAddress1 { get; set; }

        [MaxLength(30)]
        public string MailToAddress2 { get; set; }

        [MaxLength(15)]
        public string MailToAptSuite { get; set; }

        [Required]
        [MaxLength(50)]
        public string MailToCity { get; set; }

        [Required]
        [MaxLength(25)]
        public string MailToState { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PostalCode)]
        public string MailToZip { get; set; }

        [Phone]
        public string PhoneNo { get; set; }

        [Required]
        [MaxLength(25)]
        public string MailToCountry { get; set; }

        [Required]
        [MaxLength(30)]
        public string BillingAddress1 { get; set; }

        [MaxLength(30)]
        public string BillingAddress2 { get; set; }

        [MaxLength(15)]
        public string BillingAptSuite { get; set; }

        [Required]
        [MaxLength(50)]
        public string BillingCity { get; set; }

        [Required]
        [MaxLength(25)]
        public string BillingState { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PostalCode)]
        public string BillingZip { get; set; }

        [Required]
        [MaxLength(25)]
        public string BillingCountry { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }

        public FlightReservation FlightReservation { get; set; }


    }
}
