using Newtonsoft.Json;
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
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        [StringLength(20)]
        public string Day { get; set; }
        
        public int? Idfunction { get; set; }

        [ForeignKey("Idfunction")]
        public virtual Function Function { get; set; }

        [JsonIgnore]
        public virtual ICollection<Coursemodule> Coursemodules { get; set; }
    }
}
