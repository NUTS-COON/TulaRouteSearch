using System;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Entities
{
    public class RouteItem : Coordinate
    {
        public TimeSpan ToTime { get; set; }
        public string Name { get; set; }
        public int StopId { get; set; }
    }
}
