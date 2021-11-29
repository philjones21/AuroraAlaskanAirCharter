using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuroraAlaskanAirCharter.Enums
{
    public enum FlightType
    { 
        FLIGHT_SEEING = 1, 
        GLACIER_LANDING = 2,
        NA = 99,
    }

    public enum LandingSite
    {
        UNIVERSITY_PEAK = 1,
        MT_BONA = 2,
        MT_NATAZHAT = 3,
        MT_ST_ELIAS = 4,
        MT_AUGUSTA = 5,
        GOOD_NEIGHBOR_PEAK = 6,
        MT_ALVERSTONE = 7
    }
}
