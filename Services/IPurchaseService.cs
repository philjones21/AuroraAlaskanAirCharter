using System;
using System.Threading.Tasks;
using AuroraAlaskanAirCharter.Models.ViewModels;

namespace AuroraAlaskanAirCharter.Services
{
    public interface IPurchaseService
    {
        public Task<PricingViewModel> CalculateFlightPrice(FlightDetailViewModel flightDetailViewModel);

        public Task<string> CreateOrder(string userId, PurchaseOrderViewModel purchaseOrderViewModel);

        public bool ValidateFlightDetail(FlightDetailViewModel flightDetailViewModel);
    }
}
