namespace TulaRouteSearcherAPI.Models
{
    public class HereSuggestion
    {
        public string Label { get; set; }
        public string Language { get; set; }
        public string LocationId { get; set; }
        public HereAddress Address { get; set; }
        public string MatchLevel { get; set; }
    }
}
