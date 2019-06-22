using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace TulaRouteSearcherAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TestController : Controller
    {
        public TestController()
        {

        }

        /// <summary>
        /// TEST method
        /// </summary>
        /// <returns></returns>
        [HttpGet(nameof(GetTestData))]
        public async Task<IActionResult> GetTestData()
        {
            return await Task.FromResult(Ok(new { TestData = "Hello" }));
        }


    }
}
