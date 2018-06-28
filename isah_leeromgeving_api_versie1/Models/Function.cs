using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Function")]
    public class Function
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        public int? Idfunction { get; set; }
        
        public virtual ICollection<Function> Functions1 { get; set; }

        [ForeignKey("Idfunction")]
        public virtual Function Function1 { get; set; }

        [JsonIgnore]
        public virtual ICollection<Slide> Slides { get; set; }
    }
}
