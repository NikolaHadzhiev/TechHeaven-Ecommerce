using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(ShoppingCart shoppingCart) 
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var subtotal = shoppingCart.Items.Sum(item => item.ItemQuantity * item.Product.Price);
            var deliveryFee = subtotal > 5000 ? 0 : 500;

            if(string.IsNullOrEmpty(shoppingCart.PaymentIntentId)) 
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> {"card"}
                };

                intent = await service.CreateAsync(options);
            }
            else 
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee,
                };

                await service.UpdateAsync(shoppingCart.PaymentIntentId, options);
            }

            return intent;
        }
    }
}