using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore2.Models
{
    public class Category
    {
        public int category_id { get; set; }
        [Required]
        public string category_name { get; set; }
        [Required]
        public string category_imagen { get; set; }
        public string category_descripcion { get; set; }
    }
}
