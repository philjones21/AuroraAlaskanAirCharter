using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AuroraAlaskanAirCharter.Services;
using AuroraAlaskanAirCharter.Models.ViewModels;

namespace AuroraAlaskanAirCharter.Controllers
{
    [Route("api/FlightReservations")]
    [ApiController]
    public class FlightReservationsController : ControllerBase
    {
        private ILogger<FlightReservationsController> _logger;
        private IFlightReservationsService _flightReservationsService;

        public FlightReservationsController(IFlightReservationsService flightReservationsService, ILogger<FlightReservationsController> logger)
        {
            _logger = logger;
            _flightReservationsService = flightReservationsService;
        }

        // GET: api/FlightReservations
        [HttpGet("year/{year}/month/{month}")]
        public async Task<ActionResult<IEnumerable<ReservedDateViewModel>>> GetFlightReservations(int year, int month)
        {           
            List<ReservedDateViewModel> reservedDates = await _flightReservationsService.GetFlightReservationsAsync(year, month);
            if (reservedDates == null) return BadRequest();
            return reservedDates;
        }
    }
}
