using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AuroraAlaskanAirCharter.Data;
using AuroraAlaskanAirCharter.Models;
using AuroraAlaskanAirCharter.Models.ViewModels;

namespace AuroraAlaskanAirCharter.Services
{
    public class FlightReservationsService: IFlightReservationsService
    {
        private readonly CharterFlightContext _context;
        private ILogger<FlightReservationsService> _logger;

        public FlightReservationsService(CharterFlightContext context, ILogger<FlightReservationsService> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<List<ReservedDateViewModel>> GetFlightReservationsAsync(int year, int month)
        {
            if (year < 1900 || year > 2200 || month < 1 || month > 12) return null;

            IDictionary<string, ReservedDateViewModel> reservedDatesMap = new Dictionary<string, ReservedDateViewModel>();

            DateTime startDate = new DateTime(year, month, 1);
            DateTime endDate = month == 12 ? new DateTime(year + 1, 1, 1) : new DateTime(year, month + 1, 1);

            _logger.LogDebug("GetFlightReservations(): query parameters startDate: {startDate} - endDate {endDate}", startDate, endDate);

            foreach (var reservation in (await _context.FlightReservations.Where(
                record => (record.DepartureDate >= startDate && record.DepartureDate < endDate) ||
                          (record.ReturnDate >= startDate && record.ReturnDate < endDate)).ToListAsync()))
            {
                string key = "";
                if(reservation.DepartureDate >= startDate && reservation.DepartureDate < endDate)
                {
                    key = reservation.DepartureDate.Year + "-" + reservation.DepartureDate.Month + "-" + reservation.DepartureDate.Day;
                    reservedDatesMap.Add(key, new ReservedDateViewModel
                    {
                        Year = reservation.DepartureDate.Year,
                        Month = reservation.DepartureDate.Month,
                        Day = reservation.DepartureDate.Day
                    });
                }
                if(reservation.ReturnDate >= startDate && reservation.ReturnDate < endDate) {
                    key = reservation.ReturnDate.Year + "-" + reservation.ReturnDate.Month + "-" + reservation.ReturnDate.Day;
                    if (!reservedDatesMap.ContainsKey(key))
                    {
                        reservedDatesMap.Add(key, new ReservedDateViewModel
                        {
                            Year = reservation.ReturnDate.Year,
                            Month = reservation.ReturnDate.Month,
                            Day = reservation.ReturnDate.Day
                        });
                    }
                }
                
                
            }

            //Users should only be able to book flight tomorrow or after, so mark
            //any prior days as booked for the month being searched.
            int maxDay = 0;
            if(year < DateTime.Today.Year || (year == DateTime.Today.Year && month < DateTime.Today.Month))
            {
                if (month == 2) {
                    if (DateTime.IsLeapYear(year))
                    {
                        maxDay = 29;
                    }
                    else
                    {
                        maxDay = 28;
                    }
                } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                    {
                        maxDay = 31;
                    }
                else
                {
                    maxDay = 30;
                }
            }
            else if(year == DateTime.Today.Year && month == DateTime.Today.Month)
            {
                maxDay = DateTime.Today.Day;
            }

            for(int i = 1; i <= maxDay; i++)
            {
                string key = year + "-" + month + "-" + i;
                if (!reservedDatesMap.ContainsKey(key))
                {
                    reservedDatesMap.Add(key, new ReservedDateViewModel
                    {
                        Year = year,
                        Month = month,
                        Day = i
                    });
                }
            }

            return reservedDatesMap.Values.ToList();
        }

        private static ReservedDateViewModel ToReservedDate(FlightReservation reservation)
        {
            if (reservation == null) return null;
            return new ReservedDateViewModel
            {
                Year = reservation.DepartureDate.Year,
                Month = reservation.DepartureDate.Month,
                Day = reservation.DepartureDate.Day
            };
        }
    }
}
