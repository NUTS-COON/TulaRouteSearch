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

        public Stop[] GetAllStops()
        {
            using (var conn = CreateConnection())
            {
                return conn.Query<Stop>("SELECT * FROM Stop").ToArray();
            }
        }

        public Route GetRoute(int routeId)
        {
            using (var conn = CreateConnection())
            {
                return conn.Query<Route>("SELECT * FROM Route WHERE Id = @routeId", new { routeId }).FirstOrDefault();
            }
        }

        public RouteItem[] GetRouteItems(int routeId)
        {
            using (var conn = CreateConnection())
            {
                return conn.Query<RouteItem>("SELECT * FROM RouteItems WHERE Id = @routeId", new { routeId }).ToArray();
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

        public SearchedRoute[] SearchRoutes(DateTime time, Stop from, Stop to)
        {
            var query = @"
                SELECT top 3 r1.RouteId FROM 
                    RouteItems AS r1
                    INNER JOIN RouteItems AS r2 ON r1.RouteId = r2.RouteId AND r1.ToTime < r2.FromTime
                    INNER JOIN RouteDays AS rd ON r1.RouteId = rd.RouteId
                WHERE 
                    r1.StopId = @from AND r2.StopId = @to AND rd.DayOfWeek = @dayOfWeek AND r1.ToTime > 'time'";

            using (var conn = CreateConnection())
            {
                return conn.Query<SearchedRoute>(query, new
                {
                    from,
                    to,
                    dayOfWeek = time.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)time.DayOfWeek,
                    time = time.TimeOfDay
                }).ToArray();
            }
        }
    }
}
