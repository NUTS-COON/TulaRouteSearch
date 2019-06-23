using System.Collections.Generic;
using System.Linq;

namespace TulaRouteSearcherAPI.Models
{
    public class TargetRoute
    {
        public int TravelTime { get; set; }
        public IEnumerable<TransportRoute> Routes { get; set; }

        public RoutePoint GetStartPoint()
        {
            return Routes.FirstOrDefault().Points.FirstOrDefault();
        }

        public RoutePoint GetLastPoint()
        {
            return Routes.LastOrDefault().Points.LastOrDefault();
        }
    }
}
