using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            //using Extension method Sort, Search, Filter for IQueryable<T>
            var query =  _context.Products.AsQueryable().Sort(productParams.OrderBy).Search(productParams.Search).Filter(productParams.Brands, productParams.Types); 
            var products = await PagedList<Product>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);

            Response.Headers.PaginationHeader(products.PaginationMetaData);

            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            
            if(product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new {brands, types});
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]

        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDTO productDTO) 
        {
            var product = _mapper.Map<Product>(productDTO);
            
            if(productDTO.File != null) 
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.File);

                if(imageResult.Error != null) return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);

            return BadRequest(new ProblemDetails{Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDTO productDTO) 
        {
            var product = await _context.Products.FindAsync(productDTO.Id);

            if(product == null) return NotFound();

            _mapper.Map(productDTO, product);

            if(productDTO.File != null) 
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.File);

                if(imageResult.Error != null) return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                if(!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync();

            if(result == 0 || result > 0) return Ok(product);

            return BadRequest(new ProblemDetails{Title = "Problem updating product"});
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id) 
        {
            var product = await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            if(!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem deleting product"});
        }

    }
}