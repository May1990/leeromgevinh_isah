//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using isah_leeromgeving_api_versie1.Models;
using Microsoft.EntityFrameworkCore;

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
            public ActionResult<List<Course>> GetAll()
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
