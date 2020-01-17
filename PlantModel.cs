using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WateringPlants
{
    public class PlantModel
    {
        public string Name { get; set; }

        public bool WateredRecently { get; set; }
        public bool CanWater { get; set; }
    }
}
