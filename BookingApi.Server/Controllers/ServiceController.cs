using BookingApi.Server.Data;
using BookingApi.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    //Dependency Injection - _db=entry to database
    private readonly AppDbContext _db;

    public ServiceController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/Service.
    // Get all services. .Include is not necessary
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var services = await _db.Services
            .ToListAsync();

        return Ok(services);
    }

    // GET: api/Service/5
    // Get specific service with ID. Return 404-error if not found.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var service = await _db.Services
            .FirstOrDefaultAsync(s => s.Id == id);

        if (service == null) return NotFound();

        return Ok(service);
    }

    // POST: api/Service
    // Create service - add new service to database. Returns status code 201 (Created) with URL to new resource.
    [HttpPost]
    public async Task<IActionResult> Create(Service service)
    {
        _db.Services.Add(service);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = service.Id }, service);
    }

    // DELETE: api/Service/5
    // Removes service and returns 204 (No content) 
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var service = await _db.Services.FindAsync(id);

        if (service == null) return NotFound();

        _db.Services.Remove(service);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}

