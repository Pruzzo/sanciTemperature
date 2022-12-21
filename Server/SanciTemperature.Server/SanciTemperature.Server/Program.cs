using SanciTemperature.Server.Repository;
using SanciTemperature.Server.Services;
using SanciTemperature.Server.Services.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var temperatureOrigins = "SanciOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: temperatureOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                              "http://rr-server-test.azurewebsites.net")
                                                .AllowAnyHeader()
                                                .AllowAnyMethod();
                      });
});
builder.Services.AddControllers();
builder.Services.AddSingleton<TemperatureService>();
builder.Services.AddSingleton<TemperatureRepository>();
builder.Services.AddSingleton<IDateTimeHelper, DateTimeHelper>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors(temperatureOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.UseStaticFiles();

app.Run();
