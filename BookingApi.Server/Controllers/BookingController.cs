using BookingApi.Server.Data;
using BookingApi.Server.Models;
using BookingApi.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    //Dependency Injection - _db=entry to database
    private readonly AppDbContext _db;

    public BookingController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/Booking.
    // Get all bookings. .Include is used to JOIN tables
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bookings = await _db.Bookings
            .Include(b => b.Customer)
            .Include(b => b.Service)
            .ToListAsync();

        return Ok(bookings);
    }

    // GET: api/Booking/5
    // Get specific booking with ID. Return 404-error if not found.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var booking = await _db.Bookings
            .Include(b => b.Customer)
            .Include(b => b.Service)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (booking == null) return NotFound();

        return Ok(booking);
    }

    // POST: api/Booking
    // Create booking - add new booking to database. Returns status code 201 (Created) with URL to new resource.
    [HttpPost]
    public async Task<IActionResult> Create(CreateBookingDto dto)
    {
        var booking = new Booking
        {
            CustomerId = dto.CustomerId,
            ServiceId = dto.ServiceId,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
    }

    // DELETE: api/Booking/5
    // Removes booking and returns 204 (No content) 
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var booking = await _db.Bookings.FindAsync(id);

        if (booking == null) return NotFound();

        _db.Bookings.Remove(booking);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
