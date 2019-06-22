using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Entities;
using TulaRouteSearcherAPI.Models;
using TulaRouteSearcherAPI.Repositories;

namespace TulaRouteSearcherAPI.Services
{
    public class RouteSearcher : IRouteSearcher
    {
        private static Stop[] _allStops;

        private readonly IHereService _hereService;
        private readonly DbRepository _dbRepository;

        public RouteSearcher(IHereService hereService, DbRepository dbRepository)
        {
            _hereService = hereService;
            _dbRepository = dbRepository;
        }

        public async Task<List<TargetRoute>> GetRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var routes = await GetAutoRoutes(time, from, to);

            if (routes?.Any() ?? false)
                return routes;

            var manualRoutes = GetManualRoutes(time, from, to);
            routes = new List<TargetRoute>();
            foreach (var r in manualRoutes)
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

        private List<TargetRoute> GetManualRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var fromStops = GetNearestStops(from);
            var toStops = GetNearestStops(to);

            List<SearchedRoute> res = new List<SearchedRoute>();
            foreach(var fromStop in fromStops)
            {
                foreach (var toStop in toStops)
                {
                    res.AddRange(_dbRepository.SearchRoutes(time, fromStop, toStop));
                }
            }

            if (!res.Any())
                return null;

            var minTravelTime = res.Select(t => t.TravelTime).Min();

            return res
                .Where(t => t.TravelTime < 1.5 * minTravelTime)
                .OrderBy(t => t.TravelTime)
                .Take(3)
                .Select(t => GetRouteFromDb(t))
                .ToList();
        }

        private TargetRoute GetRouteFromDb(SearchedRoute sr)
        {
            return new TargetRoute
            {
                Routes = new List<TransportRoute>(),
                TravelTime = sr.TravelTime
            };
        }

        private Stop[] GetNearestStops(Coordinate point)
        {
            if(_allStops == null)
            {
                _allStops = _dbRepository.GetAllStops();
            }

            return _allStops
                .Select(s => new { s, d = GetDist(s, point) })
                .Where(x => x.d < 20000)
                .OrderBy(x => x.d)
                .Take(3)
                .Select(x => x.s)
                .ToArray();
        }

        private static double GetDist(Coordinate p1, Coordinate p2)
        {
            return Math.Sqrt(Math.Pow(111135 * (p1.Longitude - p2.Longitude), 2) + Math.Pow(55134 * (p1.Latitude - p1.Latitude), 2));
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

                    return new TargetRoute
                    {
                        Routes = routes,
                        TravelTime = r.Leg.FirstOrDefault().TravelTime
                    };
                })
                .ToList();
        }
    }
}
