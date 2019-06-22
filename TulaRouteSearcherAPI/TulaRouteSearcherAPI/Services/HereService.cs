using Newtonsoft.Json;
using System;
using System.Globalization;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public class HereService : IHereService
    {
        private readonly string appId = "nCSzEMs5Mt4xNwpSu67q";
        private readonly string appCode = "BKcZWZqhrhY2sMaIlmKh6Q";

        public async Task<HereSuggestions> GetSuggestions(string text)
        {
            if (string.IsNullOrEmpty(text))
                return null;

            var url = new StringBuilder()
                .Append("http://autocomplete.geocoder.api.here.com/6.2/suggest.json")
                .Append($"?app_id={appId}")
                .Append($"&app_code={appCode}")
                .Append($"&query={text}")
                .Append($"&beginHighlight=<b>")
                .Append($"&endHighlight=</b>")
                .ToString();
            return await Execute<HereSuggestions>(url);
        }

        public async Task<HereRouteResponse> GetRoutes(DateTime time, Coordinate from, Coordinate to)
        {
            var nfi = new NumberFormatInfo
            {
                NumberDecimalSeparator = "."
            };

            var url = new StringBuilder()
                .Append("https://route.api.here.com/routing/7.2/calculateroute.json")
                .Append($"?app_id={appId}")
                .Append($"&app_code={appCode}")
                .Append($"&language=ru-ru")
                .Append($"&mode=fastest;publicTransport")
                .Append($"&maneuverattributes=po,ti,pt,ac,di,fj,ix")
                .Append($"&routeattributes=sh,gr")
                .Append($"&waypoint0=geo!stopOver!{from.Latitude.ToString(nfi)},{from.Longitude.ToString(nfi)}")
                .Append($"&waypoint1=geo!stopOver!{to.Latitude.ToString(nfi)},{to.Longitude.ToString(nfi)}")
                .Append($"&departure={time.ToString("yyyy-MM-ddTHH:mm:ss")}")
                .ToString();
            return await Execute<HereRouteResponse>(url);
        }

        private async Task<T> Execute<T>(string url) where T : class
        {
            try
            {
                var response = await new HttpClient().GetAsync(new Uri(url));
                if (!response.IsSuccessStatusCode)
                    return null;

                var responseBody = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(responseBody);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
