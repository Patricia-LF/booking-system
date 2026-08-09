using System.ComponentModel.DataAnnotations;

namespace BookingApi.Server.Models;

public class Service
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [RegularExpression(@"^[a-zA-ZåäöÅÄÖ\s\-]+$", ErrorMessage = "Name can only contain letters and hyphens.")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Range(1, 480, ErrorMessage = "Duration must be between 1 and 480 minutes.")]
    public int DurationMinutes { get; set; }

    [Range(0, 10000, ErrorMessage = "Price must be between 0 and 10,000.")]
    public decimal Price { get; set; }
}