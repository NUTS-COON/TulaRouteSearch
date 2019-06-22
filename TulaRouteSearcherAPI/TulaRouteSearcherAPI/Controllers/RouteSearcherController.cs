using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;
using TulaRouteSearcherAPI.Services;
using TulaRouteSearcherAPI.Stores;
using TulaRouteSearcherAPI.ViewModels;

namespace TulaRouteSearcherAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RouteSearcherController : Controller
    {
        private readonly IHereService _hereService;
        private readonly IRouteSearcher _routeSearcher;
        private readonly IRouteSearcherStore _routeSearcherStore;

        public RouteSearcherController(IHereService hereService, IRouteSearcher routeSearcher,
            IRouteSearcherStore routeSearcherStore)
        {
            _hereService = hereService;
            _routeSearcher = routeSearcher;
            _routeSearcherStore = routeSearcherStore;
        }

        /// <summary> Метод получения предложений по адресу </summary>
        /// <returns></returns>
        [HttpPost(nameof(GetSuggestions))]
        public async Task<IActionResult> GetSuggestions([FromBody]AddressTextVM text)
        {
            if (string.IsNullOrEmpty(text?.Text))
                return Ok();

            var hereSuggestions = await _hereService.GetSuggestions(text.Text);
            if (hereSuggestions == null)
                return Ok();

            var result = hereSuggestions.Suggestions.Select(suggestion => new AddressInfo
            {
                Address = suggestion.Label,
                HereLocationId = suggestion.LocationId
            });

            return Ok(result);

            //var result = new List<AddressInfo>
            //{
            //    new AddressInfo
            //    {
            //        Coordinate = new Coordinate
            //        {
            //            Latitude = 54.166637,
            //            Longitude = 37.587081
            //        },
            //        Address = "просп. Ленина, 92",
            //        HereLocationId = "NT_5mGkj3z90Fbj4abzMbUE4C_xA"
            //    },
            //    new AddressInfo
            //    {
            //        Coordinate = new Coordinate
            //        {
            //            Latitude = 54.166637,
            //            Longitude = 37.587081
            //        },
            //        Address = "просп. Ленина, 93",
            //        HereLocationId = "NT_5mGkj3z90Fbj4abzMbUE4C_xA"
            //    },
            //};
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
