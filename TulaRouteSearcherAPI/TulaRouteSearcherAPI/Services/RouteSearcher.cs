using System;
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

        public async Task<List<TargetRoute>> GetRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var routes = await GetAutoRoutes(time, from, to);

            if (routes?.Any() ?? false)
                return routes;

            var manualRoutes = await GetManualRoutes(time, from, to);
            foreach(var r in manualRoutes)
            { 
                var startPoint = r.Routes.FirstOrDefault().Points.FirstOrDefault().Coordinate;
                var endPoint = r.Routes.LastOrDefault().Points.LastOrDefault().Coordinate;

                var startRoute = (await GetAutoRoutes(time, from, startPoint)).FirstOrDefault();
                var endRoute = (await GetAutoRoutes(time, endPoint, to)).FirstOrDefault();

                routes.Add(new TargetRoute
                {
                    Routes = startRoute.Routes.Concat(r.Routes).Concat(endRoute.Routes).ToList()
                });
            }
               
            return routes;
        }

        private async Task<List<TargetRoute>> GetManualRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            throw new System.NotImplementedException();
        }

        private async Task<List<TargetRoute>> GetAutoRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            return await GetHereRoutes(time, from, to);
        }

        private async Task<List<TargetRoute>> GetHereRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var result = await _hereService.GetRoutes(time, from, to);
            if (result == null)
                return null;

            return result.Response.Route
                .Select(r =>
                {
                    var maneuvers = r.Leg.FirstOrDefault().Maneuver;
                    var transports = r.PublicTransportLine;

                    var routes = new List<TransportRoute>();
                    int i = 0;
                    int travelTime = 0;
                    TransportRoute route = new TransportRoute() { Transport = $"Автобус {transports[i].LineName}", Points = new List<RoutePoint>() };
                    foreach (var maneuver in maneuvers)
                    {
                        travelTime += maneuver.TravelTime;
                        route.Points.Add(new RoutePoint
                        {
                            Description = maneuver.StopName,
                            Time = time.AddSeconds(travelTime).ToString("HH:mm:ss"),
                            Coordinate = new Coordinate
                            {
                                Latitude = maneuver.Position.Latitude,
                                Longitude = maneuver.Position.Longitude
                            }
                        });

                        if(maneuver.Action == "leave" && i + 1 < transports.Length)
                        {
                            routes.Add(route);
                            i += 1;
                            route = new TransportRoute() { Transport = $"Автобус {transports[i].LineName}", Points = new List<RoutePoint>() };
                        }
                    }
                    routes.Add(route);

                    return new TargetRoute { Routes = routes };
                })
                .ToList();
        }
    }
}
