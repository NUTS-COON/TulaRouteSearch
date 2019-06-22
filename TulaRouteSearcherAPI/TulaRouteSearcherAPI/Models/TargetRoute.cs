using System.Collections.Generic;

namespace TulaRouteSearcherAPI.Models
{
    public class TargetRoute
    {
        public IEnumerable<TransportRoute> Routes { get; set; }
    }
}
