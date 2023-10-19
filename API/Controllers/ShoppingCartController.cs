using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ShoppingCartController : BaseController
    {
        private readonly StoreContext _context;
        public ShoppingCartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetShoppingCart")]
        public async Task<ActionResult<ShoppingCartDTO>> GetShoppingCart()
        {
            //BUYER_ID is stored in a cookie when a user creates shopping cart(adds an item to the cart for the first time)
            var shoppingCart = await GetShoppingCartFn(GetBuyerId());

            if (shoppingCart == null) return NotFound();
            return shoppingCart.DTO_MAPPING();
        }



        [HttpPost]
        public async Task<ActionResult<ShoppingCartDTO>> AddItemToShoppingCart(int productId, int quantity)
        {
            var shoppingCart = await GetShoppingCartFn(GetBuyerId());
            if (shoppingCart == null) shoppingCart = CreateShoppingCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            shoppingCart.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetShoppingCart", shoppingCart.DTO_MAPPING());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to shopping cart" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromShoppingCart(int productId, int quantity)
        {
            var shoppingCart = await GetShoppingCartFn(GetBuyerId());

            if (shoppingCart == null) return NotFound();

            shoppingCart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from shopping cart" });
        }

        //GetShoppingCartFn - Retrieves User shopping cart populated with its Items in it and 
        //the Products information connected to those Items
        private async Task<ShoppingCart> GetShoppingCartFn(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("BUYER_ID");
                return null;
            }

            return await _context.ShoppingCarts
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["BUYER_ID"];
        }
        //CreateShoppingCart - if User does not have a cart - create it
        private ShoppingCart CreateShoppingCart()
        {
            var BUYER_ID = User.Identity?.Name;

            if (string.IsNullOrEmpty(BUYER_ID))
            {
                BUYER_ID = Guid.NewGuid().ToString();
                //No HTTPOnly tag because we need to access the cookie from client script.
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("BUYER_ID", BUYER_ID, cookieOptions);
            }

            //Shopping cart is empty on first initiallization
            var shoppingCart = new ShoppingCart { BuyerId = BUYER_ID };
            _context.ShoppingCarts.Add(shoppingCart);
            return shoppingCart;
        }
    }
}