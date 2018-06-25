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
    [Route("api/diagrams")]
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
                .ToList();
        }

        // GET: api/Diagrams/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiagram([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diagram = await _context.Diagrams
                .Include(diagramm => diagramm.Rectangles)
                .Include(diagramm => diagramm.Texts)
                .Include(diagramm => diagramm.Paths)
                    .ThenInclude(path => path.Positions)
                .FirstOrDefaultAsync(diagramm => diagramm.Id == id);

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