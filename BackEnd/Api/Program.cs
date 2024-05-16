using System.Reflection;
using Api.Dtos;
using Api.Extensions;
using Api.Services;
using AspNetCoreRateLimit;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureCors();
builder.Services.AddApplicationServices();
builder.Services.ConfigureRateLimiting();
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

builder.Services.AddDbContext<InventoryContext>(options =>
{
    string  connectionString = builder.Configuration.GetConnectionString("MySqlConex");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.Configure<EmailDto>(builder.Configuration.GetSection("Email"));
builder.Services.AddTransient<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseIpRateLimiting();
app.UseCors("CorsPolicy");

//app.UseHttpsRedirection(); Comentamos esta parte para prevenir problemas con HTTPS

app.UseAuthorization();

app.MapControllers();

app.Run();
