using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WateringPlants
{
    public class PlantService
    {
        public string PLANTS_JSON = "plants.json"; 

        public object sequential = new object();

        public Plant[] GetPlants()
        {
            lock(sequential)
            {
                var json = File.ReadAllText(GetJsonPath());
                return JsonConvert.DeserializeObject<Plant[]>(json);
            }
        }

        public void WaterPlants(int[] plantIndexes)
        {
            lock (sequential)
            {
                var plants = GetPlants();

                foreach (var plantIndex in plantIndexes)
                {
                    plants[plantIndex].LastWatered = DateTime.Now;    
                }

                SavePlants(plants);
            }
        }

        private void SavePlants(Plant[] plants)
        {
            var json = JsonConvert.SerializeObject(plants, Formatting.Indented);
            File.WriteAllText(GetJsonPath(), json); 
        }

        private string GetJsonPath()
        {
            var assemblyDirectory = Path.GetDirectoryName(GetType().Assembly.Location);
            return Path.Combine(assemblyDirectory, PLANTS_JSON);
        }
    }
}
