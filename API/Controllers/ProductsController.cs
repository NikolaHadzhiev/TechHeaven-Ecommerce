using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseController
    {
        private readonly StoreContext _context;
        
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string search, string brands, string types)
        {
            //using Extension method Sort, Search, Filter for IQueryable<T>
            var query =  _context.Products.AsQueryable().Sort(orderBy).Search(search).Filter(brands, types); 
            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            
            if(product == null) return NotFound();

            return product;
        }
    }
}