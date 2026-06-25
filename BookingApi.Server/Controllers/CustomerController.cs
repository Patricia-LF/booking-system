using BookingApi.Server.Data;
using BookingApi.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    //Dependency Injection - _db=entry to database
    private readonly AppDbContext _db;

    public CustomerController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/Customer.
    // Get all customers. .Include is not necessary
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _db.Customers
            .ToListAsync();

        return Ok(customers);
    }

    // GET: api/Customer/5
    // Get specific customer with ID. Return 404-error if not found.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _db.Customers
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null) return NotFound();

        return Ok(customer);
    }

    // POST: api/Customer
    // Create customer - add new customer to database. Returns status code 201 (Created) with URL to new resource.
    [HttpPost]
    public async Task<IActionResult> Create(Customer customer)
    {
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
    }

    // DELETE: api/Customer/5
    // Removes customer and returns 204 (No content) 
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var customer = await _db.Customers.FindAsync(id);

        if (customer == null) return NotFound();

        _db.Customers.Remove(customer);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}

