namespace BookingApi.Server.Models;

public class Booking
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    // Foreign keys
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;
}
