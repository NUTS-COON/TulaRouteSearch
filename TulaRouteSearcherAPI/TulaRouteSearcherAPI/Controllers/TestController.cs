using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;
using TulaRouteSearcherAPI.ViewModels;

namespace TulaRouteSearcherAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RouteSearcherController : Controller
    {
        public RouteSearcherController()
        {

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
                    Location = new Location
                    {
                        Latitude = 54.166637,
                        Longintude = 37.587081
                    },
                    Address = "просп. Ленина, 92",
                    Town = "Тула"
                },
                new AddressInfo
                {
                    Location = new Location
                    {
                        Latitude = 54.166637,
                        Longintude = 37.587081
                    },
                    Address = "просп. Ленина, 93",
                    Town = "Тула"
                },
            };

            return await Task.FromResult(Ok(result));
        }


    }
}
