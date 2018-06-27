//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using isah_leeromgeving_api_versie1.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace isah_leeromgeving_api_versie1.Controllers
{
    [Route("api/courses")]
    [ApiController]
    public class CoursesController : Controller
    {
        private readonly ModelContext _context;

        public CoursesController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Course> GetAll()
        {
            //to do module wordt niet helemaal goed opgehaald
            return _context.Courses
                //.Include(course => course.Slides)
                //.Include(course => course.Coursemodules)
                //.ThenInclude(coursemodule => coursemodule.Module)
                .ToList();
        }

        [HttpPost]
        public IActionResult Create(Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = course.Id }, course);
        }

        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<IActionResult> GetCourse([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var course = await _context.Courses
                .Include(coursee => coursee.Slides)
                .Include(coursee => coursee.Coursemodules)
                    .ThenInclude(coursemodule => coursemodule.Module)
                .FirstOrDefaultAsync(coursee => coursee.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [HttpGet("{idcourse}/{index}", Name = "GetSlide")]
        public async Task<IActionResult> GetSlide ([FromRoute]int idcourse, int index)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var slide = await _context.Slides
                .Where(slidee => slidee.Idcourse == idcourse)
                .Include(slidee => slidee.Questions)
                    .ThenInclude(question => question.Choices)
                .FirstOrDefaultAsync(slidee => slidee.Index == index);

            if (slide == null)
            {
                return NotFound();
            }

            return Ok(slide);
        }
    }
}
