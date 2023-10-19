using API.DTOs;
using API.Entities;

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
    }
}