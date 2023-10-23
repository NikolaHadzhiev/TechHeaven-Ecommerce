using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ShoppingCartExtensions
    {
        public static ShoppingCartDTO DTO_MAPPING(this ShoppingCart shoppingCart)
        {
             return new ShoppingCartDTO
            {
                Id = shoppingCart.Id,
                BuyerId = shoppingCart.BuyerId,
                Items = shoppingCart.Items.Select(item => new ShoppingCartItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.ItemQuantity
                }).ToList()
            };
        }

        public static IQueryable<ShoppingCart> RetrieveShoppingCartWithItems(this IQueryable<ShoppingCart> query, string buyerId) 
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(s => s.BuyerId == buyerId);
        }
    }
}