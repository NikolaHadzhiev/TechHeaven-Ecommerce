namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }

        //User that are not logged in can also put items in the shopping cart
        public string BuyerId { get; set; }

        public List<ShoppingItem> Items { get; set; } = new(); // new List<ShoppingItem>()

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new ShoppingItem { Product = product, ItemQuantity = quantity });
                return;
            }

            var existingShoppingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingShoppingItem != null) existingShoppingItem.ItemQuantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var existingShoppingItem = Items.FirstOrDefault(item => item.ProductId == productId);

            if(existingShoppingItem == null) return;

            existingShoppingItem.ItemQuantity -= quantity;

            if(existingShoppingItem.ItemQuantity <= 0) Items.Remove(existingShoppingItem);
        }
    }
}