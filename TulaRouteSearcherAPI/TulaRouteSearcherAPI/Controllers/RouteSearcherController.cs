using Microsoft.AspNetCore.Mvc;
using System;
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


        [HttpPost(nameof(GetRoutes))]
        public async Task<IActionResult> GetRoutes([FromBody]TargetRouteVM targetRouteVM)
        {
            var result = new List<TargetRoute>
            {
                new TargetRoute
                {
                    Routes = new List<TransportRoute>
                    {
                        new TransportRoute
                        {
                            Transport = "Автобус 52213",
                            Points = new List<RoutePoint>
                            {
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    }
                                }
                            }
                        },
                        new TransportRoute
                        {
                            Transport = "Самолет Ту52",
                            Points = new List<RoutePoint>
                            {
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    }
                                }
                            }
                        }
                    }
                },
                new TargetRoute
                {
                    Routes = new List<TransportRoute>
                    {
                        new TransportRoute
                        {
                            Transport = "На динозавре",
                            Points = new List<RoutePoint>
                            {
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    }
                                }
                            }
                        },
                        new TransportRoute
                        {
                            Transport = "Пароход",
                            Points = new List<RoutePoint>
                            {
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    },
                                },
                                new RoutePoint
                                {
                                    Description = "описание",
                                    Time = "10:00:00",
                                    Coordinate = new Coordinate
                                    {
                                        Latitude = 54.166637,
                                        Longitude = 37.587081
                                    }
                                }
                            }
                        }
                    }
                },
            };

            return await Task.FromResult(Ok(result));
        }



    }
}
