using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Entities;

namespace TulaRouteSearcherAPI.Repositories
{
    public class DbRepository 
    {
        private readonly string _connectionString;

        public DbRepository(string connectionString)
        {
            this._connectionString = connectionString;
        }

        private IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public async Task<Stop[]> GetAllStops()
        {
            using (var conn = CreateConnection())
            {
                return (await conn.QueryAsync<Stop>("SELECT Id, Name, Lat AS Latitude, Lon AS Longitude FROM Stop")).ToArray();
            }
        }

        public async Task<Route> GetRoute(int routeId)
        {
            using (var conn = CreateConnection())
            {
                return (await conn.QueryAsync<Route>("SELECT * FROM Route WHERE Id = @routeId", new { routeId })).FirstOrDefault();
            }
        }

        public async Task<RouteItem[]> GetRouteItems(int routeId)
        {
            var query = @"
                SELECT ISNULL(r.FromTime, r.ToTime) AS Time, s.Id AS StopId, Name, s.Lat AS Latitude, s.Lon AS Longitude
                FROM 
                    RouteItems AS r
                    INNER JOIN Stop AS s ON r.StopId = s.Id
                WHERE r.RouteId = @routeId";
            
            using (var conn = CreateConnection())
            {
                return (await conn.QueryAsync<RouteItem>(query, new { routeId })).ToArray();
            }
        }

        public async Task<IEnumerable<Town>> GetTowns(string[] textFilters)
        {
            var filter = string.Join(" and ", textFilters.Select(text => $"FullName Like N'%{text}%'"));

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<Town>($"SELECT * FROM Town WHERE {filter}");
            }
        }

        public async Task<IEnumerable<SearchedRoute>> SearchRoutes(DateTime time, Stop from, Stop to)
        {
            var query = @"
                SELECT TOP 10 r1.RouteId, DATEDIFF(SECOND, @time, r2.FromTime) AS TravelTime FROM 
                    RouteItems AS r1
                    INNER JOIN RouteItems AS r2 ON r1.RouteId = r2.RouteId AND r1.ToTime < r2.FromTime
                    INNER JOIN RouteDays AS rd ON r1.RouteId = rd.RouteId
                WHERE 
                    r1.StopId = @from AND r2.StopId = @to AND rd.DayOfWeek = @dayOfWeek AND r1.ToTime > @time
                ORDER BY r2.FromTime";

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<SearchedRoute>(query, new
                {
                    from = from.Id,
                    to = to.Id,
                    dayOfWeek = time.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)time.DayOfWeek,
                    time = time.TimeOfDay
                });
            }
        }
    }
}
