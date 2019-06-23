namespace TulaRouteSearcherAPI.Models
{
    public class HereAddress
    {
        public string Country { get; set; }
        public string State { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }

        public string FullAddress
        {
            get 
            {
                var city = string.IsNullOrEmpty(City) ? County : City;
                return $"{Country} {city} {District} {Street} {HouseNumber}".Trim();
            }
        }
    }
}
