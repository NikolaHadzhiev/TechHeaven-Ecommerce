using API.Entities.Order;

namespace API.DTOs
{
    public class CreateOrderDTO
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }

    }
}