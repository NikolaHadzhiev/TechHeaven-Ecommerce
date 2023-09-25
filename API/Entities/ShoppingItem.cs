using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ShoppingItems")] //So that the table name would be pluralized in DB
    public class ShoppingItem
    {
        public int Id { get; set; }
        public int ItemQuantity { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        //Relation to the shopping cart so that when the cart is deleted, the items in it are also deleted
        //from the database
        public int ShoppingCartId { get; set; } 
        public ShoppingCart ShoppingCart { get; set; }
    }
}