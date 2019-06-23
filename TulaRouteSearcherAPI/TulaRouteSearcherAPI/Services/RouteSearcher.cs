using System;
using System.Collections.Generic;
using System.Globalization;
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

            if (routes != null && routes.Any() && routes.First().TravelTime < 7200)
                return routes;

            var manualRoutes = GetManualRoutes(time, from, to);
            routes = new List<TargetRoute>();
            foreach (var r in manualRoutes)
            { 
                var startPoint = r.GetStartPoint();
                var endPoint = r.GetLastPoint();
                var endTime = time.Date.Add(endPoint.GetTime()); 

                var startRoute = (await GetAutoRoutes(time, from, startPoint.Coordinate, true))?.FirstOrDefault();
                var endRoute = (await GetAutoRoutes(time.Date.Add(endPoint.GetTime()), endPoint.Coordinate, to, true))?.FirstOrDefault();

                if (startRoute == null || endRoute == null)
                    continue;

                var startRouteEndTime = startRoute.GetLastPoint().GetTime();
                if (startRouteEndTime > startPoint.GetTime())
                    continue;

                routes.Add(new TargetRoute
                {
                    TravelTime = startRoute.TravelTime + r.TravelTime + endRoute.TravelTime,
                    Routes = startRoute.Routes.Concat(r.Routes).Concat(endRoute.Routes).ToList()
                });
            }

            routes = routes.OrderBy(t => t.TravelTime).ToList();

            return routes;
        }

        private List<TargetRoute> GetManualRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var fromStops = GetNearestStops(from);
            var toStops = GetNearestStops(to);

            List<SearchedRouteContainer> res = new List<SearchedRouteContainer>();
            foreach(var fromStop in fromStops)
            {
                foreach (var toStop in toStops)
                {
                    var routes = _dbRepository.SearchRoutes(time, fromStop, toStop)
                        .Select(r => new SearchedRouteContainer
                        {
                            From = fromStop,
                            To = toStop,
                            RouteId = r.RouteId,
                            TravelTime = r.TravelTime
                        })
                        .ToArray();
                    res.AddRange(routes);
                }
            }

            if (!res.Any())
                return null;

            var minTravelTime = res.Select(t => t.TravelTime).Min();

            return res
                .Where(t => t.TravelTime < Math.Max(2 * minTravelTime, minTravelTime + 7200))
                .OrderBy(t => t.TravelTime)
                .Take(5)
                .Select(t => GetRouteFromDb(t, time))
                .ToList();
        }

        private TargetRoute GetRouteFromDb(SearchedRouteContainer sr, DateTime time)
        {
            var route = _dbRepository.GetRoute(sr.RouteId);
            var routeItems = _dbRepository.GetRouteItems(sr.RouteId);

            var usedItems = new List<RouteItem>();
            bool use = false;
            foreach(var r in routeItems)
            {
                if (r.StopId == sr.From.Id)
                    use = true;

                if (use)
                    usedItems.Add(r);

                if (r.StopId == sr.To.Id)
                    use = false;
            }

            return new TargetRoute
            {
                Routes = new List<TransportRoute>()
                {
                    new TransportRoute
                    {
                        Transport = route.Name,
                        Points = usedItems
                            .Select(x => new RoutePoint
                            {
                                Description = x.Name,
                                Time = time.Date.Add(x.ToTime).ToString("HH:mm:ss"),
                                Coordinate = new Coordinate
                                {
                                    Latitude = x.Latitude,
                                    Longitude = x.Longitude
                                }
                            })
                            .ToList()
                    }
                },
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
                .Where(x => x.d < 10000)
                .OrderBy(x => x.d)
                .Take(7)
                .Select(x => x.s)
                .ToArray();
        }

        private static double GetDist(Coordinate p1, Coordinate p2)
        {
            return Math.Sqrt(Math.Pow(111135 * (p1.Longitude - p2.Longitude), 2) + Math.Pow(55134 * (p1.Latitude - p2.Latitude), 2));
        }

        private async Task<List<TargetRoute>> GetAutoRoutes(DateTime time, Coordinate from, Coordinate to, bool allowPedestrian = false)
        {
            return await GetHereRoutes(time, from, to);
        }

        private async Task<List<TargetRoute>> GetHereRoutes(DateTime time, Coordinate from, Coordinate to, bool allowPedestrian = false)
        {
            var result = await _hereService.GetRoutes(time, from, to);
            if (result == null && allowPedestrian)
                result = await _hereService.GetRoutes(time, from, to, "pedestrian");

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
                    TransportRoute route = new TransportRoute() { Transport = "Пешком", Points = new List<RoutePoint>() };
                    foreach (var maneuver in maneuvers)
                    {
                        if (maneuver.Action == "enter")
                        {
                            if(route.Points.Any())
                                routes.Add(route);

                            route = new TransportRoute() { Transport = $"Автобус {transports[i].LineName}", Points = new List<RoutePoint>() };
                            i++;
                        }

                        var p = new RoutePoint
                        {
                            Description = maneuver.StopName,
                            Time = time.AddSeconds(travelTime).ToString("HH:mm:ss"),
                            Coordinate = new Coordinate
                            {
                                Latitude = maneuver.Position.Latitude,
                                Longitude = maneuver.Position.Longitude
                            }
                        };
                        route.Points.Add(p);
                        travelTime += maneuver.TravelTime;

                        if (maneuver.Action == "leave")
                        {
                            routes.Add(route);
                            route = new TransportRoute() { Transport = $"Пешком", Points = new List<RoutePoint>() };
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
