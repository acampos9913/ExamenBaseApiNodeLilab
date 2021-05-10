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
    public class CategoryController : BaseController
    {
        private readonly IProductSE _category;
        public CategoryController(IProductSE category)
        {
            _category = category;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await Task.FromResult(_category.GetAll<Category>($"Select category_id, category_name, category_imagen from category", null, commandType: CommandType.Text));
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
    }
}