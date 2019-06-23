using System.Collections.Generic;

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

    public class SuggesionAddressComparer : IEqualityComparer<SuggesionAddress>
    {
        public bool Equals(SuggesionAddress x, SuggesionAddress y)
        {
            if (x?.Address == null && y?.Address == null)
                return true;
            if (x?.Address == null || y?.Address == null)
                return false;

            return x.Address == y.Address;
        }

        public int GetHashCode(SuggesionAddress obj) => obj?.Address?.GetHashCode() ?? 0;
    }
}
