//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using isah_leeromgeving_api_versie1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace isah_leeromgeving_api_versie1.Controllers
{
    [Route("api/courses")]
    [ApiController]
    public class CoursesController : Controller
    {

        /*[Route("api/courses")]
        
        public class TodoController : ControllerBase
        {*/
            private readonly CourseContext _context;

            public CoursesController(CourseContext context)
            {
                _context = context;

                if (_context.Courses.Count() == 0)
                {
                    _context.Courses.Add(new Course { Name = "Course1" });
                    _context.SaveChanges();
                }
            }

            [HttpGet]
            public ActionResult<List<Course>> GetAll()
            {
                return _context.Courses.ToList();
            }

            [HttpPost]
            public IActionResult Create(Course course)
            {
                _context.Courses.Add(course);
                _context.SaveChanges();

                return CreatedAtRoute("GetTodo", new { id = course.Id }, course);
            }

            [HttpGet("{id}", Name = "GetCourse")]
            public ActionResult<Course> GetById(long id)
            {
                var item = _context.Courses.Find(id);
                if (item == null)
                {
                    return NotFound();
                }
                return item;
            }
        }
}
