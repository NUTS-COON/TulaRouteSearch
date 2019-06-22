using System.Collections.Generic;

namespace TulaRouteSearcherAPI.Models
{
    public class TargetRoute
    {
        public int TravelTime { get; set; }
        public IEnumerable<TransportRoute> Routes { get; set; }
    }
}
