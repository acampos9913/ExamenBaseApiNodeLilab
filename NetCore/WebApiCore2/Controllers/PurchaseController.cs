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
using System.Text.Json;

namespace WebApiCore2.Controllers
{
    public class PurchaseController : BaseController
    {
        private readonly IPurchaseSE _purchase;
        public PurchaseController(IPurchaseSE purchase)
        {
            _purchase = purchase;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCategory([FromBody] Purchase model)
        {
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("pParametroJson", JsonSerializer.Serialize(model.Purchase_Json), DbType.String);
                var category = await Task.FromResult(_purchase.Insert<int>("spJSon"
                    , dbparams,
                    commandType: CommandType.StoredProcedure));

                    return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
    }
}