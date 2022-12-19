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
            var datas = temperatureRepository.Get(from, to);
            return datas;

        }

        public void Save(float temperature)
        {
            var dateTemperature = new DateTemperature
            {
                Temperature = temperature,
                CreatedAt = Now()
            };
            var fileName = Now().ToString("dd-MM-yyyy");
            temperatureRepository.Save(dateTemperature, fileName);
        }
        private DateTime Now()
        {
            return DateTime.Now;
        }
    }
}
