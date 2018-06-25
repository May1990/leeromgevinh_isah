using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Coursemodule")]
    public class Coursemodule
    {
        public int Idcourse{ get; set; }

        [JsonIgnore]
        [ForeignKey("Idcourse")]
        public Course Course { get; set; }

        public int Idmodule { get; set; }

        [ForeignKey("Idmodule")]
        public Module Module { get; set; }
    }
}
