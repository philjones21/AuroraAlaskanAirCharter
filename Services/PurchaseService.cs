using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AuroraAlaskanAirCharter.Data;
using AuroraAlaskanAirCharter.Models;
using AuroraAlaskanAirCharter.Models.ViewModels;
using AuroraAlaskanAirCharter.Enums;

namespace AuroraAlaskanAirCharter.Services
{
    public class PurchaseService: IPurchaseService
    {
        private readonly CharterFlightContext _charterFlightContext;
        private ILogger<PurchaseService> _logger;

        public PurchaseService(CharterFlightContext charterFlightContext, ILogger<PurchaseService> logger)
        {
            _charterFlightContext = charterFlightContext;
            _logger = logger;
        }
        
        public async Task<PricingViewModel> CalculateFlightPrice(FlightDetailViewModel flightDetailViewModel)
        {
            PricingViewModel pricingViewModel = null;

            try
            {
                Product product = await _charterFlightContext.Products.SingleAsync(p => p.ProductId == (long)flightDetailViewModel.FlightType);
                if (product != null)
                {

                    pricingViewModel = CalculatePrices(product.Price, product.AdditionalPassengerPrice, 0, flightDetailViewModel.NumberOfPassengers);
                    if (pricingViewModel == null)
                    {
                        _logger.LogInformation("Pricing calculation failed for " +
                                               $" price {product.Price}, additional price {product.AdditionalPassengerPrice}" +
                                               $"tax 0, number of passengers {flightDetailViewModel.NumberOfPassengers}");
                        return null;
                    }                  
                }
            }catch(Exception e)
            {
                _logger.LogError(e.Message);
            }

            return pricingViewModel;
        }



        public async Task<string> CreateOrder(string userId, PurchaseOrderViewModel purchaseOrderViewModel)
        {
            string orderId = "";
            FlightDetailViewModel flightDetail = purchaseOrderViewModel.FlightDetail;
            Product product;
            try
            {
                product = await _charterFlightContext.Products.SingleAsync(p => p.ProductId == (long)flightDetail.FlightType);
                if (product == null)
                {
                    _logger.LogError($"Order Creation failed. Failed to find Product for FlightType: {flightDetail.FlightType}");
                    return null;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return null;
            }

            PricingViewModel priceTotals = CalculatePrices(product.Price, product.AdditionalPassengerPrice, 0, flightDetail.NumberOfPassengers);
            if (priceTotals == null)
            {
                _logger.LogError($"Error calculating costs. Base price: {product.Price}, " +
                                 $"Addl Passenger Price: {product.AdditionalPassengerPrice}, " +
                                 $"Number of passengers: {flightDetail.NumberOfPassengers}.");
                return null;
            }

            FlightReservation flightReservation = new FlightReservation
            {
                FlightType = flightDetail.FlightType,
                LandingSite = flightDetail.LandingSite,
                DepartureDate = flightDetail.DepartureDate,
                ReturnDate = flightDetail.ReturnDate,
                NumberOfPassengers = flightDetail.NumberOfPassengers
            };

            OrderDetail orderDetail = new OrderDetail
            {
                ProductId = product.ProductId,
                ProductDesc = product.ProductDesc,
                Total = priceTotals.Total,
                Quantity = flightDetail.NumberOfPassengers
            };

            Guid refGUID = Guid.NewGuid();

            Order order = new Order
            {
                ReferenceId = refGUID,
                ApplicationUserId = userId,
                OrderDate = DateTime.UtcNow,
                Total = priceTotals.Total,
                SubTotal = priceTotals.SubTotal,
                Tax = priceTotals.Tax,
                MailToAddress1 = purchaseOrderViewModel.MailToAddress1,
                MailToAddress2 = purchaseOrderViewModel.MailToAddress2,
                MailToAptSuite = purchaseOrderViewModel.MailToAptSuite,
                MailToCity = purchaseOrderViewModel.MailToCity,
                MailToState = purchaseOrderViewModel.MailToState,
                MailToZip = purchaseOrderViewModel.MailToZip,
                MailToCountry = purchaseOrderViewModel.MailToCountry,
                PhoneNo = purchaseOrderViewModel.PhoneNo,
                BillingAddress1 = purchaseOrderViewModel.BillingAddress1,
                BillingAddress2 = purchaseOrderViewModel.BillingAddress2,
                BillingAptSuite = purchaseOrderViewModel.BillingAptSuite,
                BillingCity = purchaseOrderViewModel.BillingCity,
                BillingState = purchaseOrderViewModel.BillingState,
                BillingZip = purchaseOrderViewModel.BillingZip,
                BillingCountry = purchaseOrderViewModel.BillingCountry,
                FlightReservation = flightReservation,
            };

            order.OrderDetails = new List<OrderDetail>();

            order.OrderDetails.Add(orderDetail);
            _charterFlightContext.Add(order);

            try
            {
                await _charterFlightContext.SaveChangesAsync();
                try
                {
                    Order newOrder = await _charterFlightContext.Orders.SingleAsync(o => o.ReferenceId == refGUID);
                    if (newOrder == null)
                    {
                        _logger.LogError($"Failed to find new order for guid: {refGUID}");
                        return null;
                    }
                    orderId = newOrder.OrderId.ToString();
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    return null;
                }
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
            }
            return orderId;
        }

        //Formula for Price calculations.
        private static PricingViewModel CalculatePrices(decimal basePrice, decimal additionalPassengerCost, decimal tax, int numberOfPassengers)
        {
            if (numberOfPassengers > 0)
            {
                decimal SubTotal = basePrice + (additionalPassengerCost * (numberOfPassengers - 1));
                decimal Total = basePrice + (additionalPassengerCost * (numberOfPassengers - 1)) + tax;

                return new PricingViewModel
                {
                    Total = Total,
                    SubTotal = SubTotal,
                    Tax = tax
                };
            }
            return null;
        }

        //Apply additional validations.
        public bool ValidateFlightDetail(FlightDetailViewModel flightDetailViewModel)
        {
            if (flightDetailViewModel.FlightType == FlightType.NA ||
               (flightDetailViewModel.FlightType == FlightType.GLACIER_LANDING && (int)flightDetailViewModel.LandingSite < 1)
               )
            {
                return false;
            }
            DateTime today = DateTime.Today.Date;
            DateTime departDate = flightDetailViewModel.DepartureDate.Date;
            DateTime returnDate = flightDetailViewModel.ReturnDate.Date;

            if (DateTime.Compare(departDate, today) <= 0 ||
               ((flightDetailViewModel.FlightType == FlightType.GLACIER_LANDING) && DateTime.Compare(returnDate, departDate) < 0))
            {
                return false;
            }
            return true;
        }

        /*
        public async Task<List<OrderHistoryViewModel>> GetOrderHistory(string AccountId)
        {
            List<OrderHistoryViewModel> orderHistory = new List<OrderHistoryViewModel>();
            
            foreach (var order in (await _charterFlightContext.Orders.Where(d => d.AccountId == AccountId).ToListAsync()))
            {
                orderHistory.Add(new OrderHistoryViewModel{
                    OrderId = order.OrderId,
                    ProductId = order.ProductId,
                    ProductDesc = order.ProductDesc,
                    Total = order.Total,
                });
            };
            
            return orderHistory;
        }
        */
    }
}
