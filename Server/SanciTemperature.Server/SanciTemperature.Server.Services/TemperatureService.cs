using SanciTemperature.Server.Dto;
using SanciTemperature.Server.Repository;
using SanciTemperature.Server.Services.Helpers;
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
        private readonly IDateTimeHelper dateTimeHelper;

        public TemperatureService(TemperatureRepository temperatureRepository, IDateTimeHelper dateTimeHelper)
        {
            this.temperatureRepository = temperatureRepository;
            this.dateTimeHelper = dateTimeHelper;
        }

        public List<ChartData> Get(DateTime from, DateTime to)
        {
            var datas = temperatureRepository.Get(from, to);
            var showYear = true;
            var showMonth = true;
            var showDay = true;
            if (datas.Any())
            {
                var groupedByYear = datas.GroupBy(_ => _.CreatedAt.Year).ToList();
                if (groupedByYear.Count() == 1)
                    showYear = false;
                var groupedByMonth = datas.GroupBy(_ => _.CreatedAt.Month).ToList();
                if (!showYear && groupedByMonth.Count() == 1)
                    showMonth = false;
                var groupedByDay = datas.GroupBy(_ => _.CreatedAt.Day).ToList();
                if (!showMonth && groupedByDay.Count() == 1)
                    showDay = false;
            }
            var format = GetDateFormat(showYear, showMonth, showDay);
            return datas.Select(_ => new ChartData() { name = ConvertToLocalDt(_.CreatedAt).ToString(format), Temperatura = Convert.ToSingle(Math.Round(_.Temperature, 2)) })?.ToList() ?? new List<ChartData>();
        }

        public List<DateTime> GetAvailableDays()
        {
            return temperatureRepository.GetAvailableDays();
        }

        public string GetDateFormat(bool year, bool month, bool day)
        {
            var format = "";
            if (day)
                format += "dd ";
            if (month)
                format += "MM ";
            if (year)
                format += "yyyy ";
            format += "HH:mm";
            return format;
        }
        public void Save(float temperature)
        {
            var date = dateTimeHelper.GetNow();
            var dateTemperature = new DateTemperature
            {
                Temperature = temperature,
                CreatedAt = date
            };
            var fileName = date.ToString("dd-MM-yyyy");
            temperatureRepository.Save(dateTemperature, fileName);
        }
        private DateTime ConvertToLocalDt(DateTime input)
        {
            var zone = TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");
            var localDt = TimeZoneInfo.ConvertTimeFromUtc(input, zone);
            return localDt;
        }
        private DateTime ConvertToUtcDt(DateTime input)
        {
            var dt = new DateTime(input.Year, input.Month, input.Day, input.Hour, input.Minute, input.Second, input.Millisecond, DateTimeKind.Unspecified);
            var zone = TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");
            var utcDt = TimeZoneInfo.ConvertTimeToUtc(dt, zone);
            return utcDt;
        }
    }
}
