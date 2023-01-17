using Microsoft.AspNetCore.Mvc;

namespace SanciTemperature.Server.Controllers.api
{
    [Route("api/v1/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public BaseApiController()
        {

        }
    }
}
