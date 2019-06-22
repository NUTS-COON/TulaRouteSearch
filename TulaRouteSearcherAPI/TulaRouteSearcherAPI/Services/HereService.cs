using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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

            try
            {
                var url = new StringBuilder()
                    .Append("http://autocomplete.geocoder.api.here.com/6.2/suggest.json")
                    .Append($"?app_id={appId}")
                    .Append($"&app_code={appCode}")
                    .Append($"&query={text}")
                    .Append($"&beginHighlight=<b>")
                    .Append($"&endHighlight=</b>")
                    .ToString();

                var response = await new HttpClient().GetAsync(new Uri(url));
                if (!response.IsSuccessStatusCode)
                    return null;

                var responseBody = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<HereSuggestions>(responseBody);
            }
            catch(Exception)
            {
                return null;
            }
        }
    }
}
