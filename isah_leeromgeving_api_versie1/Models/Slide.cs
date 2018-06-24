using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Slide")]
    public class Slide
    {
        public Slide()
        {
            Slidediagrams = new HashSet<Slidediagram>();
            Questions = new HashSet<Question>();
        }

        public int Id { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Index { get; set; }

        public int Idcourse{ get; set; }

        public int Idfunction { get; set; }

        [StringLength(200)]
        public string VideoURL { get; set; }

        public virtual Function Function { get; set; }

        public virtual Course Course { get; set; }

        public virtual ICollection<Slidediagram> Slidediagrams { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
