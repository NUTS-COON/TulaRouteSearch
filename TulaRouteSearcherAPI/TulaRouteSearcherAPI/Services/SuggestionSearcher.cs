using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;
using TulaRouteSearcherAPI.Repositories;

namespace TulaRouteSearcherAPI.Services
{
    public class SuggestionSearcher : ISuggestionSearcher
    {
        private readonly IHereService _hereService;
        private readonly DbRepository _dbRepository;

        public SuggestionSearcher(IHereService hereService, DbRepository dbRepository)
        {
            _hereService = hereService;
            _dbRepository = dbRepository;
        }

        public async Task<IEnumerable<SuggesionAddress>> GetSuggestions(string text)
        {
            if (string.IsNullOrEmpty(text))
                return null;

            var listSuggestions = await Task.WhenAll(GetHereSuggestions(text), GetRepositorySuggestions(text));

            var result = Enumerable.Empty<SuggesionAddress>();
            foreach (var suggestions in listSuggestions)
                result = result.Concat(suggestions);

            return result;
        }

        private async Task<IEnumerable<SuggesionAddress>> GetHereSuggestions(string text)
        {
            var hereSuggestions = await _hereService.GetSuggestions(text);
            if (hereSuggestions == null)
                return Enumerable.Empty<SuggesionAddress>();

            return hereSuggestions.Suggestions.Select(suggestion => new SuggesionAddress
            {
                Address = suggestion.Address.FullAddress,
                HereLocationId = suggestion.LocationId
            }).Distinct(new SuggesionAddressComparer());
        }

        private async Task<IEnumerable<SuggesionAddress>> GetRepositorySuggestions(string text)
        {
            var filter = text.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            return (await _dbRepository.GetTowns(filter))
                .Select(suggestion => new SuggesionAddress
                {
                    Coordinate = new Coordinate
                    {
                        Latitude = suggestion.Lat,
                        Longitude = suggestion.Lon
                    },
                    Address = suggestion.FullName
                });
        }
    }
}
