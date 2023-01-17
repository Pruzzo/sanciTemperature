using SanciTemperature.Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Services
{
    public class SettingsService
    {
        private readonly SettingsRepository settingsRepository;

        public SettingsService(SettingsRepository settingsRepository)
        {
            this.settingsRepository = settingsRepository;
        }
        public void SetSleepTime(Int64 sleepTime) => settingsRepository.SetSleepTime(sleepTime);

        public Int64 GetSleepTime() => settingsRepository.GetSleepTime();

    }
}
