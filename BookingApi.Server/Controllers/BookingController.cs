using Microsoft.AspNetCore.Mvc;

namespace BookingApi.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new { message = "Booking API works!" });
    }
}
