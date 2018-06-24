using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Diagram")]
    public class Diagram
    {
        public Diagram()
        {
            Paths = new HashSet<Path>();
            Rectangles = new HashSet<Rectangle>();
            Texts = new HashSet<Text>();
            Slidediagrams = new HashSet<Slidediagram>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        
        public virtual ICollection<Path> Paths { get; set; }

       
        public virtual ICollection<Rectangle> Rectangles { get; set; }

       
        public virtual ICollection<Text> Texts { get; set; }

        public virtual ICollection<Slidediagram> Slidediagrams { get; set; }
    }
}
