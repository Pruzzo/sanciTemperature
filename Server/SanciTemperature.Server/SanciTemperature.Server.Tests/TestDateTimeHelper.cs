using SanciTemperature.Server.Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Tests
{
    public class TestDateTimeHelper : IDateTimeHelper
    {
        private readonly DateTime date;

        public TestDateTimeHelper(DateTime date)
        {
            this.date = date;
        }
        public DateTime GetNow()
        {
            return date;
        }
    }
}
