using Microsoft.AspNetCore.Mvc;
using SanciTemperature.Server.Dto;
using SanciTemperature.Server.Services;

namespace SanciTemperature.Server.Controllers.api.v1
{
    [Route("api/v1/[controller]")]
    public class TemperatureController : BaseApiController
    {
        private readonly TemperatureService temperatureService;

        public TemperatureController(TemperatureService temperatureService)
        {
            this.temperatureService = temperatureService;
        }
        [HttpGet("save")]
        public IActionResult Save([FromQuery] float temperature)
        {
            temperatureService.Save(temperature);
            return Ok();
        }
        [HttpGet("get")]
        public IActionResult Get([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var datas = temperatureService.Get(from, to);
            return Ok(datas);
        }
    }
}
