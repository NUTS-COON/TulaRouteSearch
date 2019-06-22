
namespace TulaRouteSearcherAPI.Models
{
    public class HereRouteResponse
    {
        public HereRouteInfo[] Route { get; set; }
    }

    public class HereRouteInfo
    {
        public HereLegInfo[] Leg { get; set; }
    }

    public class HereLegInfo
    {
        public int Length { get; set; }
        public int TravelTime { get; set; }
        public HereManeuverInfo[] Maneuver { get; set; }
    }

    public class HereManeuverInfo
    {
        public Coordinate Position { get; set; }
        public int Length { get; set; }
        public int TravelTime { get; set; }
        public int FirstPoint { get; set; }
        public int LastPoint { get; set; }
        public string Id { get; set; }
        public string Action { get; set; }
        public string StopName { get; set; }
    }
}
