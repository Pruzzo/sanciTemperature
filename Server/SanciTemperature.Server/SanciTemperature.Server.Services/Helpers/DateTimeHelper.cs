﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Services.Helpers
{
    public class DateTimeHelper : IDateTimeHelper
    {
        public DateTime GetNow() => DateTime.UtcNow;
    }
}
