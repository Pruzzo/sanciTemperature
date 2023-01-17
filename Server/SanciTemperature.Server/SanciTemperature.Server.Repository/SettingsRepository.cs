using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Repository
{
    public class SettingsRepository : BaseRepository
    {
        public SettingsRepository()
        {

        }
        public void SetSleepTime(Int64 time)
        {
            var path = $"{basePath}/sleepTime.json";
            File.WriteAllText(path, time.ToString());
        }
        public Int64 GetSleepTime()
        {
            var path = $"{basePath}/sleepTime.json";
            var sleepTime = File.ReadAllText(path);
            return Int64.Parse(sleepTime);
        }
    }
}
