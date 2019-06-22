using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TulaRouteSearcherAPI.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string connectionString;

        public BaseRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        protected IDbConnection Db => new SqlConnection(connectionString);

        protected void DisposableExecute(Action<IDbConnection> action)
        {
            using (var db = new SqlConnection(connectionString))
                action(db);
        }

        protected TResult DisposableExecute<TResult>(Func<IDbConnection, TResult> func)
        {
            using (var db = new SqlConnection(connectionString))
                return func(db);
        }

        protected async Task<TResult> DisposableExecuteAsync<TResult>(Func<IDbConnection, Task<TResult>> func)
        {
            using (var db = new SqlConnection(connectionString))
                return await func(db);
        }

        protected async Task DisposableExecuteAsync(Func<IDbConnection, Task> action)
        {
            using (var db = new SqlConnection(connectionString))
                await action(db);
        }
    }
}
