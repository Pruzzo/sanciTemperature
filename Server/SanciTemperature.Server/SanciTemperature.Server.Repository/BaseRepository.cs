using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanciTemperature.Server.Repository
{
    public class BaseRepository
    {
        internal readonly string basePath;
        public BaseRepository()
        {
            basePath = $"{Environment.CurrentDirectory}/wwwroot/Database";

        }
    }
}
