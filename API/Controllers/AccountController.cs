using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO) 
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password)) return Unauthorized();

            var userShoppingCart = await GetShoppingCartFn(loginDTO.Username);
            var anonymousShoppingCart = await GetShoppingCartFn(Request.Cookies["BUYER_ID"]);

            if(anonymousShoppingCart != null) 
            {
                if (userShoppingCart != null) _context.ShoppingCarts.Remove(userShoppingCart);
                anonymousShoppingCart.BuyerId = user.UserName;
                Response.Cookies.Delete("BUYER_ID");
                await _context.SaveChangesAsync();
            }

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                ShoppingCart = anonymousShoppingCart != null ? anonymousShoppingCart.DTO_MAPPING() : userShoppingCart?.DTO_MAPPING()
            };
        }

        [HttpPost("register")]

        public async Task<ActionResult> Register(RegisterDTO registerDTO) 
        { 
            var user = new User{UserName = registerDTO.Username, Email = registerDTO.Email};

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem(); 
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        //Test purposes for authentication and authorizaton
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userShoppingCart = await GetShoppingCartFn(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = Request.Headers[HeaderNames.Authorization],
                ShoppingCart = userShoppingCart?.DTO_MAPPING() 
            };
        }

        private async Task<ShoppingCart> GetShoppingCartFn(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("BUYER_ID");
                return null;
            }

            return await _context.ShoppingCarts
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
    }
}