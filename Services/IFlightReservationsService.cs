using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AuroraAlaskanAirCharter.Models.ViewModels;

namespace AuroraAlaskanAirCharter.Services
{
    public interface IFlightReservationsService
    {
        Task<List<ReservedDateViewModel>> GetFlightReservationsAsync(int year, int month);
    }
}
