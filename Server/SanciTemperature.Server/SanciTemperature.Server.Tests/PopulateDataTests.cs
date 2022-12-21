using SanciTemperature.Server.Repository;
using SanciTemperature.Server.Services;

namespace SanciTemperature.Server.Tests
{
    public class PopulateDataTests
    {
        [Fact]
        public void AddFakeEntries()
        {
            var end = DateTime.UtcNow;
            var index = end.AddDays(-50);
            var random = new Random();
            var temperature = 10.0;
            while (index < end)
            {
                var dtHelper = new TestDateTimeHelper(index);
                var repo = new TemperatureRepository();
                var service = new TemperatureService(repo, dtHelper);
                var value = random.NextDouble();
                var condition = random.Next(0, 2);
                if (condition == 0)
                    temperature += value;
                else
                    temperature -= value;
                service.Save(Convert.ToSingle(temperature));
                index = index.AddMinutes(30);
            }
        }
    }
}