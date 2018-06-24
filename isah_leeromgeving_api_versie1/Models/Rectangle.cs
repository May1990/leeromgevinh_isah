using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Rectangle")]
    public class Rectangle
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string Rectanglecode { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Iddiagram { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Width { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Height { get; set; }

        [Required]
        [StringLength(15)]
        public string Fill { get; set; }

        [Required]
        [StringLength(100)]
        public string Text { get; set; }

        public virtual Diagram Diagram { get; set; }
    }
}
