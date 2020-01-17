using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WateringPlants.Controllers
{
    [Route("api/[controller]")]
    public class WaterPlantsController : Controller
    {
        PlantService plantService = new PlantService();

        // GET: api/<controller>
        [HttpGet]
        public PlantModel[] GetPlants()
        {
            var now = DateTime.Now;
            return plantService.GetPlants()
                .Select(p => new PlantModel
                {
                    Name = p.Name,
                    CanWater = p.CanWater(),
                    WateredRecently = p.WasWateredRecently()
                })
                .ToArray();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]int[] wateredPlants)
        {
            plantService.WaterPlants(wateredPlants);
        }
    }
}