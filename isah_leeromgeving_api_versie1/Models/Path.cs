using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Path")]
    public class Path
    {
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

        [JsonIgnore]
        [ForeignKey("Iddiagram")]
        public virtual Diagram Diagram { get; set; }

        //[InverseProperty("Path")]
        public virtual ICollection<Position> Positions { get; set; }
    }
}
