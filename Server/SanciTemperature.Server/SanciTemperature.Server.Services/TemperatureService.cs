using SanciTemperature.Server.Dto;
using SanciTemperature.Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Services
{
    public class TemperatureService
    {
        private readonly TemperatureRepository temperatureRepository;

        public TemperatureService(TemperatureRepository temperatureRepository)
        {
            this.temperatureRepository = temperatureRepository;
        }

        public List<DateTemperature> Get(DateTime from, DateTime to)
        {
            var datas = temperatureRepository.Get(ConvertToUtcDt(from), ConvertToUtcDt(to));
            return datas;
        }

        public void Save(float temperature)
        {
            var dateTemperature = new DateTemperature
            {
                Temperature = temperature,
                CreatedAt = DateTime.UtcNow
            };
            var fileName = DateTime.UtcNow.ToString("dd-MM-yyyy");
            temperatureRepository.Save(dateTemperature, fileName);
        }

        private static DateTime ConvertToUtcDt(DateTime input)
        {
            var dt = new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute, input.Second, input.Millisecond, DateTimeKind.Unspecified);
            var zone = TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");
            var utcDt = TimeZoneInfo.ConvertTimeToUtc(dt, zone);
            return utcDt;
        }
    }
}
