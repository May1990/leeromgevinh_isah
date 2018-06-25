using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("User")]
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Firstname { get; set; }

        [Required]
        [StringLength(50)]
        public string Lastname { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Birthdate { get; set; }

        [StringLength(50)]
        public string Functioncompany { get; set; }

        [StringLength(50)]
        public string Companyname { get; set; }

        [ForeignKey("Companyname")]
        public virtual Company Company { get; set; }
    }
}
