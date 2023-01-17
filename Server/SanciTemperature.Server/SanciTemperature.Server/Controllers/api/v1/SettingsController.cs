using Microsoft.AspNetCore.Mvc;
using SanciTemperature.Server.Services;

namespace SanciTemperature.Server.Controllers.api.v1
{
    public class SettingsController : BaseApiController
    {
        private readonly SettingsService settingsService;

        public SettingsController(SettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpGet("setsleep")]
        public IActionResult SetSleepTime([FromQuery] Int64 sleepTime)
        {
            settingsService.SetSleepTime(sleepTime);
            return Ok();
        }
        [HttpGet("getsleep")]
        public IActionResult GetSleepTime()
        {
            var st = settingsService.GetSleepTime();
            return Ok(st);
        }
    }
}
