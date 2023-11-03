using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Order;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
        public PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ShoppingCartDTO>> CreateOrUpdatePaymentIntent()
        {
            var shoppingCart = await _context.ShoppingCarts.RetrieveShoppingCartWithItems(User.Identity.Name).FirstOrDefaultAsync();

            if (shoppingCart == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(shoppingCart);

            if(intent == null) return BadRequest(new ProblemDetails{Title = "Problem creating payment intent"});

            shoppingCart.PaymentIntentId = shoppingCart.PaymentIntentId ?? intent.Id;
            shoppingCart.ClientSecret = shoppingCart.ClientSecret ?? intent.ClientSecret;

            _context.Update(shoppingCart);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });

            return shoppingCart.DTO_MAPPING();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook() 
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], 
            _config["StripeSettings:WebhookSecret"]);

            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _context.Orders.FirstOrDefaultAsync(x => x.PaymentIntentId == charge.PaymentIntentId);

            if(charge.Status == "succeeded") order.OrderStatus = OrderStatus.Payment_Recieved;

            await _context.SaveChangesAsync();

            return new EmptyResult();
        }
    }
}