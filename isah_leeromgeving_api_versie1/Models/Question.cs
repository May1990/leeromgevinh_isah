using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Question")]
    public class Question
    {
        public Question()
        {
            Choices = new HashSet<Choice>();
        }

        public int Id { get; set; }

        [Column("Question")]
        [Required]
        [StringLength(200)]
        public string Questiontext { get; set; }

        [StringLength(200)]
        public string Extrainfo { get; set; }

        public int Idcourse { get; set; }

        public virtual Course Course { get; set; }

        public virtual ICollection<Choice> Choices { get; set; }
    }
}
