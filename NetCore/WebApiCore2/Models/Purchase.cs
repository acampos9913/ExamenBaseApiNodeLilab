using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore2.Models
{
    public class Purchase
    {
        [Required]
        public List<Product> Purchase_Json { get; set; }
    }
}
