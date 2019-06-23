using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Entities
{
    public class Stop : Coordinate
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
