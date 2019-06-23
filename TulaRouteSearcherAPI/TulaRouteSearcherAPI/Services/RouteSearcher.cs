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

            if (routes != null && routes.Any() && routes.First().TravelTime < 7200)
                return routes;

            var manualRoutes = await GetManualRoutes(time, from, to);

            var tasks = manualRoutes.Select(r => ExtendManualRoute(r, time, from, to)).ToArray();
            await Task.WhenAll(tasks);

            if (routes == null)
                routes = new List<TargetRoute>();

            routes.AddRange(tasks.Select(t => t.Result).Where(t => t != null));

            return routes
                .Select(Convert)
                .OrderBy(t => t.TravelTime)
                .ToList();
        }

        private TargetRoute Convert(TargetRoute r)
        {
            r.Routes = r.Routes.Where(t => t.Points.Count > 1).ToList();
            return r;
        }

        private async Task<TargetRoute> ExtendManualRoute(TargetRoute r, DateTime time, Coordinate from, Coordinate to)
        {
            var startPoint = r.GetStartPoint();
            var endPoint = r.GetLastPoint();
            var endTime = time.Date.Add(endPoint.GetTime());

            var startRoute = (await GetAutoRoutes(time, from, startPoint.Coordinate, true))?.FirstOrDefault();
            var endRoute = (await GetAutoRoutes(time.Date.Add(endPoint.GetTime()), endPoint.Coordinate, to, true))?.FirstOrDefault();

            if (startRoute == null || endRoute == null)
                return null;

            var startRouteEndTime = startRoute.GetLastPoint().GetTime();
            if (startRouteEndTime > startPoint.GetTime())
                return null;

            return new TargetRoute
            {
                TravelTime = (int)(endRoute.GetLastPoint().GetTime() - time.TimeOfDay).TotalSeconds,
                Routes = startRoute.Routes.Concat(r.Routes).Concat(endRoute.Routes).ToList()
            };
        }

        private async Task<List<TargetRoute>> GetManualRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var res = await FindManualRoutes(time, from, to);

            if (!res.Any())
                return null;

            var minTravelTime = res.Select(t => t.TravelTime).Min();

            var result = res
                .Where(t => t.TravelTime < Math.Max(2 * minTravelTime, minTravelTime + 7200))
                .OrderBy(t => t.TravelTime)
                .Take(5)
                .ToArray();

            var tasks = res.Select(t => GetRouteFromDb(t, time)).ToArray();
            await Task.WhenAll(tasks);
            return tasks.Select(t => t.Result).ToList();
        }

        private async Task<List<SearchedRouteContainer>> FindManualRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var fromStops = await GetNearestStops(from);
            var toStops = await GetNearestStops(to);

            var tasks = new List<Task<SearchedRouteContainer[]>>();
            foreach (var fromStop in fromStops)
            {
                foreach (var toStop in toStops)
                {
                    tasks.Add(FindManualRoutes(time, fromStop, toStop));
                }
            }
            await Task.WhenAll(tasks);
            return tasks.SelectMany(t => t.Result).ToList();
        }

        private async Task<SearchedRouteContainer[]> FindManualRoutes(DateTime time, Stop fromStop, Stop toStop)
        {
            var routes = await _dbRepository.SearchRoutes(time, fromStop, toStop);

            return routes
                .Select(r => new SearchedRouteContainer
                {
                    From = fromStop,
                    To = toStop,
                    RouteId = r.RouteId,
                    TravelTime = r.TravelTime
                })
                .ToArray();
        }

        private async Task<TargetRoute> GetRouteFromDb(SearchedRouteContainer sr, DateTime time)
        {
            var route = await _dbRepository.GetRoute(sr.RouteId);
            var routeItems = await _dbRepository.GetRouteItems(sr.RouteId);

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
                                Time = time.Date.Add(x.Time).ToString("HH:mm:ss"),
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

        private async Task<Stop[]> GetNearestStops(Coordinate point)
        {
            if(_allStops == null)
            {
                _allStops = await _dbRepository.GetAllStops();
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
