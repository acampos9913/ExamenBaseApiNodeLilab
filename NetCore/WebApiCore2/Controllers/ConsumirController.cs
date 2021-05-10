using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using WebApiCore2.Models;

namespace WebApiCore2.Controllers
{
    public class ConsumirController : BaseController
    {
        private string Api = "https://localhost:5000/api";

        [HttpGet("category/get")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                List<Category> categoryList = new List<Category>();
                using (var httpClient = new HttpClient(clientHandler))
                {
                    string URL = Api + "/category/get";
                    HttpResponseMessage response = await httpClient.GetAsync(URL);
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    categoryList = JsonConvert.DeserializeObject<List<Category>>(apiResponse).Select(
                        c => new Category
                        {
                            category_id = c.category_id,
                            category_name = c.category_name,
                            category_descripcion = c.category_descripcion,
                            category_imagen = c.category_imagen
                        }
                        ).ToList();
                }

                if (categoryList == null)
                {
                    return NotFound();
                }

                return Ok(categoryList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpGet("product/get/category/{Id}")]
        public async Task<IActionResult> GetProductsCategories(int? Id)
        {
            try
            {
                List<Product> productList = new List<Product>();
                using (var httpClient = new HttpClient())
                {
                    string URL = Api + "/product/get/category/" + Id;
                    HttpResponseMessage response = await httpClient.GetAsync(URL);
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    productList = JsonConvert.DeserializeObject<List<Product>>(apiResponse).Select(
                        p => new Product
                        {
                            product_id = p.product_id,
                            product_name = p.product_name,
                            product_descripcion = p.product_descripcion,
                            product_imagen = p.product_imagen,
                            product_cantidad = p.product_cantidad,
                            product_precio = p.product_precio
                        }
                        ).ToList();
                }

                if (productList == null)
                {
                    return NotFound();
                }

                return Ok(productList);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("product/get/{Id}")]
        public async Task<IActionResult> GetProductId(int? Id)
        {
            if (Id == null)
            {
                return BadRequest();
            }

            try
            {
                string URL = Api + "/product/get/" + Id;
                Product _product = new Product();

                using (var httpClient = new HttpClient())
                {
                    HttpResponseMessage response = await httpClient.GetAsync(URL);
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    _product = JsonConvert.DeserializeObject<Product>(apiResponse);
                }
                if (_product == null)
                {
                    return NotFound();
                }

                return Ok(_product);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("purchase/add")]
        public async Task<IActionResult> AddCategory([FromBody] Purchase model)
        {
            try
            {
                string URL = Api + "/purchase/add";

                using (var httpClient = new HttpClient())
                {
                    StringContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await httpClient.PostAsync(URL, content);
                    string apiResponse = await response.Content.ReadAsStringAsync();
                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
