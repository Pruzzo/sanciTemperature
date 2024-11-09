using Newtonsoft.Json;
using SanciTemperature.Server.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Repository
{
    public class TemperatureRepository : BaseRepository
    {

        public TemperatureRepository()
        {
        }

        public List<DateTemperature> Get(DateTime from, DateTime to)
        {
            var datas = new List<DateTemperature>();
            var days = new List<string>();
            var index = from;
            while (index <= to)
            {
                days.Add(index.ToString("dd-MM-yyyy"));
                index = index.AddDays(1);
            }
            foreach (var day in days)
            {
                var path = $"{basePath}/{day}.json";
                if (File.Exists(path))
                {
                    var stream = File.ReadAllText(path) ?? "";
                    datas.AddRange(JsonConvert.DeserializeObject<List<DateTemperature>>(stream) ?? new List<DateTemperature>());
                }
            }
            var result = datas.Where(_ => _.CreatedAt >= from && _.CreatedAt <= to).OrderBy(_ => _.CreatedAt)?.ToList() ?? new List<DateTemperature>();
            return result;
        }

        public List<DateTime> GetAvailableDays()
        {
            var path = $"{basePath}";
            var files = Directory.GetFiles(path).Take(30).ToList();
            return files.Select(_ => { try { return DateTime.Parse(_.Split('\\').Last().Split('.').First()); } catch (Exception e) { return new DateTime(); } }
            ).Where(_ => _ != default)?.ToList() ?? new List<DateTime>();
        }

        public void Save(DateTemperature dateTemperature, string fileName)
        {
            var path = $"{basePath}/{fileName}.json";
            var exist = File.Exists(path);
            var data = new List<DateTemperature>();
            if (exist)
            {
                var stream = File.ReadAllText(path);
                data = JsonConvert.DeserializeObject<List<DateTemperature>>(stream) ?? new List<DateTemperature>();
            }
            else { }
            data.Add(dateTemperature);
            File.WriteAllText(path, JsonConvert.SerializeObject(data));
        }

    }
}
