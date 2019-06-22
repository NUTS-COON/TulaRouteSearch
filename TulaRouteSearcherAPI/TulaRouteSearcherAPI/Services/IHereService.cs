using System;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public interface IHereService
    {
        Task<HereSuggestions> GetSuggestions(string text);
        Task<HereRouteResponse> GetRoutes(DateTime time, Coordinate from, Coordinate to);
    }
}
