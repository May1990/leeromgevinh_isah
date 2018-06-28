using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Choice")]
    public class Choice
    {
        public int Id { get; set; }

        public int Idquestion { get; set; }

        [StringLength(300)]
        public string Answer { get; set; }

        [Required]
        [StringLength(7)]
        public string Correct { get; set; }

        [JsonIgnore]
        [ForeignKey("Idquestion")]
        public virtual Question Question { get; set; }
    }
}
