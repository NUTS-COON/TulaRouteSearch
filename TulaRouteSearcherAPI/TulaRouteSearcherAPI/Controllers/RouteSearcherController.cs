using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
            var result = new List<AddressInfo>
            {
                new AddressInfo
                {
                    Coordinate = new Coordinate
                    {
                        Latitude = 54.166637,
                        Longitude = 37.587081
                    },
                    Address = "просп. Ленина, 92",
                    Town = "Тула"
                },
                new AddressInfo
                {
                    Coordinate = new Coordinate
                    {
                        Latitude = 54.166637,
                        Longitude = 37.587081
                    },
                    Address = "просп. Ленина, 93",
                    Town = "Тула"
                },
            };

            return await Task.FromResult(Ok(result));
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
            var result = await _hereService.GetSuggestions(text.Text);
            return Ok(result);
        }

    }
}
