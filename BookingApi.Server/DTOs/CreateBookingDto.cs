namespace BookingApi.Server.DTOs;

public class CreateBookingDto
{
    public int CustomerId { get; set; }
    public int ServiceId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}
