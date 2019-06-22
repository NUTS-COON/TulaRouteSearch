using System.Collections.Generic;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public interface IRouteSearcher
    {
        Task<List<TargetRoute>> GetRoutes(Coordinate from, Coordinate to);
    }
}
