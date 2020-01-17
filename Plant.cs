using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WateringPlants
{
    public class Plant
    {
        public string Name { get; set; }
        public DateTime? LastWatered { get; set; }

        [JsonIgnore]
        public static readonly TimeSpan MIN_TIME_BETWEEN_WATERINGS = TimeSpan.FromMinutes(30);
        public bool CanWater() => LastWatered ==  null || DateTime.Now - LastWatered > MIN_TIME_BETWEEN_WATERINGS;

        [JsonIgnore]
        public static TimeSpan WATERED_RECENTLY_THRESHOLD = TimeSpan.FromDays(180);
        public bool WasWateredRecently() => 
            LastWatered != null && DateTime.Now - LastWatered < WATERED_RECENTLY_THRESHOLD;
    }
}
