using System.Collections.Generic;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public interface IHereService
    {
        Task<IEnumerable<HereSuggestion>> GetSuggestions(string text);
    }
}
