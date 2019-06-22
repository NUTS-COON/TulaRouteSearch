using System.Collections.Generic;

namespace TulaRouteSearcherAPI.Models
{
    public class TransportRoute
    {
        public string Transport { get; set; }
        public List<RoutePoint> Points { get; set; }
    }
}
