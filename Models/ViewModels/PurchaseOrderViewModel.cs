using System;
using System.ComponentModel.DataAnnotations;

namespace AuroraAlaskanAirCharter.Models.ViewModels
{
    public class PurchaseOrderViewModel
    {
        [Required]
        public FlightDetailViewModel FlightDetail { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

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

    }
}
