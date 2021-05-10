using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore2.Models
{
    public class Product
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string product_imagen { get; set; }
        public decimal product_precio { get; set; }
        public string product_descripcion { get; set; }
        [Required]
        public decimal product_cantidad { get; set; }
        public Category category_id { get; set; }
    }
}
