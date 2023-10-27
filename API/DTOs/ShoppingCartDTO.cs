namespace API.DTOs{
    public class ShoppingCartDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<ShoppingCartItemDTO> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}