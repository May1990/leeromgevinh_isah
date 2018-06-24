using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Module")]
    public class Module
    {
        public Module()
        {
            Slides = new HashSet<Slide>();
            Courses = new HashSet<Course>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        [StringLength(20)]
        public string Day { get; set; }
        
        public virtual ICollection<Slide> Slides { get; set; }
        
        public virtual ICollection<Course> Courses { get; set; }
    }
}
