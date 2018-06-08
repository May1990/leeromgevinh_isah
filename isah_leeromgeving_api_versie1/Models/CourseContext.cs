using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace isah_leeromgeving_api_versie1.Models
{
    public class CourseContext : DbContext
    {
        public CourseContext(DbContextOptions<CourseContext> options): base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }
    }
}
