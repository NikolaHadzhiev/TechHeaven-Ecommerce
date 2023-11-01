using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Order;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                        .ProjectionOrderToOrderDTO()
                        .Where(x => x.BuyerId == User.Identity.Name)
                        .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _context.Orders
                        .ProjectionOrderToOrderDTO()
                        .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var shoppingCart = await _context.ShoppingCarts
                                       .RetrieveShoppingCartWithItems(User.Identity.Name)
                                       .FirstOrDefaultAsync();
            
            if(shoppingCart == null) return BadRequest(new ProblemDetails{Title = "Could not locate shopping cart"});

            var items = new List<OrderItem>();

            foreach(var item in shoppingCart.Items) 
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);

                var itemOrdered = new ProductItemOrdered
                { 
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.ItemQuantity
                };

                items.Add(orderItem);
                productItem.QuantityInStock -= item.ItemQuantity;
            }

            var subtotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = subtotal > 5000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDTO.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                PaymentIntentId = shoppingCart.PaymentIntentId
            };

            _context.Orders.Add(order);
            _context.ShoppingCarts.Remove(shoppingCart);

            if(orderDTO.SaveAddress) 
            {
                var user = await _context.Users
                .Include(a => a.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name); //No need for userManager

                var address = new UserAddress
                {
                    FullName = orderDTO.ShippingAddress.FullName,
                    MainAddress = orderDTO.ShippingAddress.MainAddress,
                    OptionalAddress = orderDTO.ShippingAddress.OptionalAddress,
                    City = orderDTO.ShippingAddress.City,
                    State = orderDTO.ShippingAddress.State,
                    ZipCode = orderDTO.ShippingAddress.ZipCode,
                    Country = orderDTO.ShippingAddress.Country
                };

                user.Address = address;
                _context.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

            return BadRequest("Problem creating order");
        }
    }
}