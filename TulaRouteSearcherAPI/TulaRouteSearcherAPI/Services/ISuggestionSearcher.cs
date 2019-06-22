using System.Collections.Generic;
using System.Threading.Tasks;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.Services
{
    public interface ISuggestionSearcher
    {
        Task<IEnumerable<SuggesionAddress>> GetSuggestions(string text);
    }
}
