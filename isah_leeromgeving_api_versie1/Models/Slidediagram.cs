using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace isah_leeromgeving_api_versie1.Models
{
    [Table("Slidediagram")]
    public class Slidediagram
    {
        public int Iddiagram { get; set; }
        public Diagram Diagram { get; set; }

        public int Idslide { get; set; }
        public Slide Slide { get; set; }
    }
}
