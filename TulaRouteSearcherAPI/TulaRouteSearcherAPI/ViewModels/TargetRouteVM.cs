using System;
using TulaRouteSearcherAPI.Models;

namespace TulaRouteSearcherAPI.ViewModels
{
    public class TargetRouteVM
    {
        public DateTime? Time { get; set; }
        public AddressInfo From { get; set; }
        public AddressInfo To { get; set; }
    }
}
