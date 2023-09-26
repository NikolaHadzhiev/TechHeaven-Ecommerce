import { useEffect, useState } from "react";
import { ShoppingCart } from "../../app/interfaces/shoppingCart";
import apiRequests from "../../app/api/requests";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

const ShoppingCartPage = () => {
  const [loading, setLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

  useEffect(() => {
    apiRequests.ShoppingCart.get()
      .then((shoppingCart) => setShoppingCart(shoppingCart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent message="Loading shopping cart... 🥱" />
  if(!shoppingCart) return <Typography variant="h3">Your shopping cart is empty</Typography>

  return <h1>{shoppingCart.buyerId}</h1>;
};

export default ShoppingCartPage;
