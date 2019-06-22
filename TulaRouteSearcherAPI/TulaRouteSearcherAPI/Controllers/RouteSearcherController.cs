using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Services;
using TulaRouteSearcherAPI.ViewModels;

namespace TulaRouteSearcherAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RouteSearcherController : Controller
    {
        private readonly IHereService _hereService;
        private readonly ISuggestionSearcher _suggestionSearcher;
        private readonly IRouteSearcher _routeSearcher;

        public RouteSearcherController(IHereService hereService, IRouteSearcher routeSearcher, ISuggestionSearcher suggestionSearcher)
        {
            _hereService = hereService;
            _routeSearcher = routeSearcher;
            _suggestionSearcher = suggestionSearcher;
        }

        /// <summary> Метод получения предложений по адресу </summary>
        /// <returns></returns>
        [HttpPost(nameof(GetSuggestions))]
        public async Task<IActionResult> GetSuggestions([FromBody]AddressTextVM text)
        {
            if (string.IsNullOrEmpty(text?.Text))
                return Ok();

            var result = await _suggestionSearcher.GetSuggestions(text.Text);
            return Ok(result);
        }

        /// <summary> Метод поиска маршрутов  </summary>
        /// <param name="targetRouteVM"></param>
        /// <returns></returns>
        [HttpPost(nameof(GetRoutes))]
        public async Task<IActionResult> GetRoutes([FromBody]TargetRouteVM targetRouteVM)
        {
            var time = targetRouteVM.Time ?? DateTime.Now;
            var from = targetRouteVM.From.Coordinate;
            var to = targetRouteVM.To.Coordinate;

            var result = await _routeSearcher.GetRoutes(time, from, to);

            return Ok(result);
        }

        [HttpPost(nameof(GetHereSuggestions))]
        public async Task<IActionResult> GetHereSuggestions([FromBody]AddressTextVM text)
        {
            if (string.IsNullOrEmpty(text?.Text))
                return Ok();

            var result = await _hereService.GetSuggestions(text.Text);
            return Ok(result);
        }

        [HttpPost(nameof(GetCoordinateByHereLocation))]
        public async Task<IActionResult> GetCoordinateByHereLocation([FromBody]HereLocationVM location)
        {
            if (string.IsNullOrEmpty(location?.LocationId))
                return Ok();

            var result = await _hereService.GetLocation(location.LocationId);
            return Ok(result);
        }

    }
}
