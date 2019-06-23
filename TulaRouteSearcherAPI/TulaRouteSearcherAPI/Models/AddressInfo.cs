namespace TulaRouteSearcherAPI.Models
{
    public class AddressInfo
    {
        public Coordinate Coordinate { get; set; }
        public string HereLocationId { get; set; }
    }

    public class SuggesionAddress : AddressInfo
    {
        public string Address { get; set; }
    }
}
