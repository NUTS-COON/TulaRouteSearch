using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public interface IRouteSearcher
    {
        Task<List<TargetRoute>> GetRoutes(DateTime time, Coordinate from, Coordinate to);
    }
}
