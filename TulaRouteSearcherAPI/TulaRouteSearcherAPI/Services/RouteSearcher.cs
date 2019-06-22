using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public class RouteSearcher : IRouteSearcher
    {
        private readonly IHereService _hereService;

        public RouteSearcher(IHereService hereService)
        {
            _hereService = hereService;
        }

        public async Task<List<TargetRoute>> GetRoutes(Coordinate from, Coordinate to)
        {
            var routes = await GetAutoRoutes(from, to);

            if (routes?.Any() ?? false)
                return routes;

            var manualRoutes = await GetManualRoutes(from, to);
            foreach(var r in manualRoutes)
            { 
                var startPoint = r.Routes.FirstOrDefault().Points.FirstOrDefault().Coordinate;
                var endPoint = r.Routes.LastOrDefault().Points.LastOrDefault().Coordinate;

                var startRoute = (await GetAutoRoutes(from, startPoint)).FirstOrDefault();
                var endRoute = (await GetAutoRoutes(endPoint, to)).FirstOrDefault();

                routes.Add(new TargetRoute
                {
                    Routes = startRoute.Routes.Concat(r.Routes).Concat(endRoute.Routes).ToList()
                });
            }
               
            return routes;
        }

        private async Task<List<TargetRoute>> GetManualRoutes(Coordinate from, Coordinate to)
        {
            throw new System.NotImplementedException();
        }

        private async Task<List<TargetRoute>> GetAutoRoutes(Coordinate from, Coordinate to)
        {
            return await GetHereRoutes(from, to);
        }

        private async Task<List<TargetRoute>> GetHereRoutes(Coordinate from, Coordinate to)
        {
            var result = await _hereService.GetRoutes(from, to);
            throw new System.NotImplementedException();
        }
    }
}
