using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public class HereService : IHereService
    {
        public async Task<IEnumerable<HereSuggestion>> GetSuggestions(string text)
        {
            try
            {
                var client = new HttpClient();

                //var url = $@"http://autocomplete.geocoder.api.here.com/6.2/suggest.json
                //                ?app_id={YOUR_APP_ID}
                //                &app_code={YOUR_APP_CODE}
                //                &query={text}
                //                &beginHighlight=<b>
                //                &endHighlight=</b>";

                var url = string.Empty;

                var response = await client.GetAsync(new Uri(url));
                if (!response.IsSuccessStatusCode)
                    return null;

                var responseBody = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<IEnumerable<HereSuggestion>>(responseBody);
            }
            catch(Exception)
            {
                return null;
            }
        }
    }
}
