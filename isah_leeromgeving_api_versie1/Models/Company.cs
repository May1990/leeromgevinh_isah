using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Company")]
    public class Company
    {
        public Company()
        {
            Users = new HashSet<User>();
        }

        [Key]
        [StringLength(50)]
        public string Companyname { get; set; }

        [Required]
        [StringLength(50)]
        public string Street { get; set; }

        [Required]
        [StringLength(10)]
        public string Numberstreet { get; set; }

        [Required]
        [StringLength(50)]
        public string Zippostalcode { get; set; }

        [Required]
        [StringLength(50)]
        public string Staddorp { get; set; }

        [Required]
        [StringLength(50)]
        public string Provincie { get; set; }

        [Required]
        [StringLength(50)]
        public string Country { get; set; }
        
        public virtual ICollection<User> Users { get; set; }
    }
}
