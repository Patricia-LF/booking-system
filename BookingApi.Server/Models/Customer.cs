using System.ComponentModel.DataAnnotations;

namespace BookingApi.Server.Models;

public class Customer
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [RegularExpression(@"^[a-zA-ZåäöÅÄÖ\s\-]+$", ErrorMessage = "Name can only contain letters and hyphens.")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(15)]
    [RegularExpression(@"^[0-9+\s\-]{7,15}$", ErrorMessage = "Invalid phone number format.")]
    public string Phone { get; set; } = string.Empty;
}