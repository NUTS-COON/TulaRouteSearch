using TulaRouteSearcherAPI.Repositories;

namespace TulaRouteSearcherAPI.Stores
{
    public class RouteSearcherStore : BaseStore, IRouteSearcherStore
    {
        private readonly RouteRepository _routeRepository;

        public RouteSearcherStore(string connectionString)
        {
            _routeRepository = new RouteRepository(connectionString);
        }

    }
}
