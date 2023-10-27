using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PaymentsController : BaseController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        public PaymentsController(PaymentService paymentService, StoreContext context)
        {
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

            var result = await _context.SaveChangesAsync() > 0;

            if(!result) return BadRequest(new ProblemDetails{Title = "Problem ubdating shopping cart with intent"});

            return shoppingCart.DTO_MAPPING();
        }
    }
}