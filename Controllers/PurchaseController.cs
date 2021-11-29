
using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using AuroraAlaskanAirCharter.Services;
using AuroraAlaskanAirCharter.Models.ViewModels;
using AuroraAlaskanAirCharter.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Stripe;
using System.Security.Claims;

namespace AuroraAlaskanAirCharter.Controllers
{
    [Route("api/Purchase")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private ILogger<PurchaseController> _logger;
        private IPurchaseService _purchaseService;
        private readonly UserManager<ApplicationUser> _userManager;

        public PurchaseController(IPurchaseService purchaseService, 
                                  ILogger<PurchaseController> logger,
                                  UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _purchaseService = purchaseService;
            _userManager = userManager;
        }

        // POST api/Purchase/FlightPrice
        [HttpPost("FlightPrice")]
        public async Task<ActionResult<PricingViewModel>> FlightPrice(FlightDetailViewModel flightDetailViewModel)
        {
            if (!ModelState.IsValid || !_purchaseService.ValidateFlightDetail(flightDetailViewModel))
            {
                return BadRequest();
            }

            return await _purchaseService.CalculateFlightPrice(flightDetailViewModel);
        }

        // POST api/Purchase/FlightPurchaseIntent
        [HttpPost("FlightPurchaseIntent")]
        public async Task<ActionResult<PaymentIntentResponseViewModel>> FlightPurchaseIntent(FlightDetailViewModel flightDetailViewModel)
        {
            if (!ModelState.IsValid || !_purchaseService.ValidateFlightDetail(flightDetailViewModel))
            {
                return BadRequest();
            }

            PricingViewModel pricingViewModel = await _purchaseService.CalculateFlightPrice(flightDetailViewModel);

            if(pricingViewModel == null) return BadRequest();

            var paymentIntentService = new PaymentIntentService();
            try
            {
                var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
                {
                    Amount = (long)(pricingViewModel.Total * 100),
                    Currency = "usd",
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                    },
                });
                return new PaymentIntentResponseViewModel
                {
                    ClientSecret = paymentIntent.ClientSecret,
                    Pricing = pricingViewModel
                };
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
            }

            return null;

        }


        // POST api/Purchase/PurchaseOrder
        [HttpPost("PurchaseOrder")]
        [Authorize]
        public async Task<ActionResult<string>> PurchaseOrder(PurchaseOrderViewModel purchaseOrderViewModel)
        {
            if (!ModelState.IsValid || !_purchaseService.ValidateFlightDetail(purchaseOrderViewModel.FlightDetail))
            {
                return BadRequest();
            }
            string userId = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
            
            string orderId = await _purchaseService.CreateOrder(userId, purchaseOrderViewModel);

            if (orderId == null || orderId.Length == 0)
            {
                return BadRequest("Order creation failed.");
            }
            return orderId;
        }

       

            // GET api/Purchase/OrderHistory
            /*
            [HttpGet("OrderHistory")]
            public async Task<ActionResult<IEnumerable<OrderHistoryViewModel>>> OrderHistory()
            {
                return await _purchaseService.GetOrderHistoryAsync(//Account);
            }
            */
        
    }
}
