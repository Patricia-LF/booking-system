using BookingApi.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=booking.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.SetIsOriginAllowed(origin =>
        {
            var host = new Uri(origin).Host;
            return host == "localhost" ||
                   host.EndsWith(".railway.app") ||
                   host.EndsWith(".vercel.app");
        })
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Auto-migrate database on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowReact");
app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
