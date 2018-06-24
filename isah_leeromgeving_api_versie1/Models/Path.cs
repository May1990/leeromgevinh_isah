using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Path")]
    public class Path
    {
        public Path()
        {
            Positions = new HashSet<Position>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Pathcode { get; set; }

        public int Iddiagram { get; set; }

        [Required]
        [StringLength(6)]
        public string Dashed { get; set; }

        [Required]
        [StringLength(6)]
        public string Startarrow { get; set; }

        [Required]
        [StringLength(6)]
        public string Endarrow { get; set; }

        public virtual Diagram Diagram { get; set; }
        
        public virtual ICollection<Position> Positions { get; set; }
    }
}
