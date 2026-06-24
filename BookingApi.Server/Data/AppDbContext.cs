using BookingApi.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Booking> Bookings { get; set; }
}
