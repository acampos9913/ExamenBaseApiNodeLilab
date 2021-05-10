using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using WebApiCore2.Models;
using WebApiCore2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiCore2.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductSE _product;
        public ProductController(IProductSE product)
        {
            _product = product;
        }
        
        [HttpGet("get/category/{Id}")]
        public async Task<IActionResult> GetProductsCategories(int? Id)
        {
            try
            {
                var categories = await Task.FromResult(_product.GetAll<Product>($"Select product_id, product_name, product_imagen from product where category_id = {Id}", null, commandType: CommandType.Text));
                if (categories == null)
                {
                    return NotFound();
                }

                return Ok(categories);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet("get/{Id}")]
        public async Task<IActionResult> GetProductId(int? Id)
        {
            if (Id == null)
            {
                return BadRequest();
            }

            try
            {
                var category = await Task.FromResult(_product.Get<Product>($"Select product_id, product_name, product_imagen, product_precio, product_descripcion, product_cantidad from product where product_id = {Id}", null, commandType: CommandType.Text));

                if (category == null)
                {
                    return NotFound();
                }

                return Ok(category);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}