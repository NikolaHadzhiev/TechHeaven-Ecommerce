using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
                if(!userManager.Users.Any()) 
                {
                    var user = new User
                    {
                        UserName = "Niki",
                        Email = "member@test.com" 
                    };

                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");

                    var admin = new User
                    {
                        UserName = "admin",
                        Email = "admin@test.com"
                    };

                    await userManager.CreateAsync(admin, "Pa$$w0rd");
                    await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
                }

                if(context.Products.Any()) return;

                var products = new List<Product>
                {
                
                new Product
                {
                    Name = "Lenovo IdeaPad 1 15\"",
                    Description ="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 56900,
                    PictureUrl = "/images/products/lenovo_ideapad_1_15_82V7006EBM.png",
                    Brand = "Lenovo",
                    Type = "Laptop",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "MSI Katana GF66 12UGS",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 269900,
                    PictureUrl = "/images/products/msi_katana_gf66_12ugs_9S7158332495.png",
                    Brand = "MSI",
                    Type = "Laptop",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Intel Core i7-13700K",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 92900,
                    PictureUrl = "/images/products/intel_core_i713700k.png",
                    Brand = "Intel",
                    Type = "CPU",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "ASUS TUF Gaming A15 FA507RR-HN003",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 285900,
                    PictureUrl = "/images/products/asus_tuf_gaming_a15_fa507rrhn003.png",
                    Brand = "ASUS",
                    Type = "Laptop",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "AMD Ryzen 5 5600X",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 41900,
                    PictureUrl = "/images/products/amd_ryzen_5_5600x.png",
                    Brand = "AMD",
                    Type = "CPU",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "AMD Ryzen 9 7900",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 99900,
                    PictureUrl = "/images/products/amd_ryzen_9_7900_box.png",
                    Brand = "AMD",
                    Type = "CPU",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Acer Nitro VG252QXbmiipx",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 40900,
                    PictureUrl = "/images/products/acer_nitro_vg252qxbmiipx.png",
                    Brand = "Acer",
                    Type = "Monitor",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Samsung Galaxy Z Fold5 1TB, Phantom Black",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 439900,
                    PictureUrl = "/images/products/SMF946BZKNEUE.png",
                    Brand = "Samsung",
                    Type = "Phone",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Apple iPhone 13 Pro Max 1TB Sierra Blue",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 349900,
                    PictureUrl = "/images/products/mlln3hua.png",
                    Brand = "Apple",
                    Type = "Phone",
                    QuantityInStock = 100
                }

                };

                foreach (var product in products)
                {
                    context.Products.Add(product);
                }

                context.SaveChanges();
        }
    }
}