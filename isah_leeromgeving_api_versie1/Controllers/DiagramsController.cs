using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using isah_leeromgeving_api_versie1.Models;

namespace isah_leeromgeving_api_versie1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagramsController : ControllerBase
    {
        private readonly ModelContext _context;

        public DiagramsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Diagrams
        [HttpGet]
        public IEnumerable<Diagram> GetDiagrams()
        {
            return _context.Diagrams
                .Include(diagram => diagram.Rectangles)
                .Include(diagram => diagram.Texts)
                .Include(diagram => diagram.Paths)
                .ThenInclude(path => path.Positions)
                .ToList();
            //return _context.Diagrams;
        }

        // GET: api/Diagrams/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiagram([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diagram = await _context.Diagrams.FindAsync(id);

            if (diagram == null)
            {
                return NotFound();
            }

            return Ok(diagram);
        }

        // PUT: api/Diagrams/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiagram([FromRoute] int id, [FromBody] Diagram diagram)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != diagram.Id)
            {
                return BadRequest();
            }

            _context.Entry(diagram).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiagramExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Diagrams
        [HttpPost]
        public async Task<IActionResult> PostDiagram([FromBody] Diagram diagram)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Diagrams.Add(diagram);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiagram", new { id = diagram.Id }, diagram);
        }

        // DELETE: api/Diagrams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiagram([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diagram = await _context.Diagrams.FindAsync(id);
            if (diagram == null)
            {
                return NotFound();
            }

            _context.Diagrams.Remove(diagram);
            await _context.SaveChangesAsync();

            return Ok(diagram);
        }

        private bool DiagramExists(int id)
        {
            return _context.Diagrams.Any(e => e.Id == id);
        }
    }
}