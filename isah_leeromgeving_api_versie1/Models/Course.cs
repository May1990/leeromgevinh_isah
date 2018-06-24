using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Course")]
    public class Course
    {
        public Course()
        {
            Modules = new HashSet<Module>();
            Slides = new HashSet<Slide>();
        }
        public int Id {get; set;}

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(1200)]
        public string Description { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Days { get; set; }

        public virtual ICollection<Module> Modules { get; set; }

        public virtual ICollection<Slide> Slides { get; set; }
    }
}
