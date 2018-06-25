using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Position")]
    public class Position
    {
        public int Id { get; set; }

        [Column(TypeName = "numeric")]
        public decimal X { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Y { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Nr { get; set; }

        public int Idpath { get; set; }

        [JsonIgnore]
        [ForeignKey("Idpath")]
        public virtual Path Path { get; set; }
    }
}
