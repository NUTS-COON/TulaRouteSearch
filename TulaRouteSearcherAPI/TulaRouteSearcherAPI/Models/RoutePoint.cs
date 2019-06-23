using System;
using System.Globalization;

namespace TulaRouteSearcherAPI.Models
{
    public class RoutePoint
    {
        public Coordinate Coordinate { get; set; }
        public string Description { get; set; }
        public string Time { get; set; }

        public TimeSpan GetTime()
        {
            return DateTime.ParseExact(Time, "HH:mm:ss", CultureInfo.InvariantCulture).TimeOfDay;
        }
    }
}
