using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Text")]
    public class Text
    {
        [Column(Order = 0)]
        [StringLength(10)]
        public string Textcode { get; set; }

        
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Iddiagram { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Width { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Height { get; set; }

        [Column("Text")]
        [Required]
        [StringLength(100)]
        public string TextOfText { get; set; }

        [JsonIgnore]
        [ForeignKey("Iddiagram")]
        public virtual Diagram Diagram { get; set; }
    }
}
