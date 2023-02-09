using Microsoft.AspNetCore.Mvc;
using SanciTemperature.Server.Dto;
using SanciTemperature.Server.Services;

namespace SanciTemperature.Server.Controllers.api.v1
{ 
    public class TemperatureController : BaseApiController
    {
        private readonly TemperatureService temperatureService;
        private readonly SettingsService settingsService;

        public TemperatureController(TemperatureService temperatureService, SettingsService settingsService)
        {
            this.temperatureService = temperatureService;
            this.settingsService = settingsService;
        }
        [HttpGet("save")]
        public IActionResult Save([FromQuery] float temperature)
        {
            temperatureService.Save(temperature);
            var st = settingsService.GetSleepTime();
            return Ok(new GenericResponse() { SleepTime = st});
        }
        [HttpGet("get")]
        public IActionResult Get([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var datas = temperatureService.Get(from, to);
            return Ok(datas);
        }
    }
}
