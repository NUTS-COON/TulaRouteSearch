using TulaRouteSearcherAPI.Entities;

namespace TulaRouteSearcherAPI.Models
{
    public class SearchedRouteContainer : SearchedRoute
    {
        public Stop From { get; set; }
        public Stop To { get; set; }
    }
}
