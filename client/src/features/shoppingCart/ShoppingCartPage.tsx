import { Button, Grid, Typography } from "@mui/material";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/reduxHooks";
import ShoppingCartTable from "./ShoppingCartTable";
import "./ShoppingCartPage.scss"

const ShoppingCartPage = () => {
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);

  

  if (!shoppingCart || shoppingCart.items.length === 0)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="shopping-cart-empty"
      >
        <Grid item xs={3}>
          <Typography variant="h3">Your shopping cart is empty</Typography>
        </Grid>
      </Grid>
    );

  return (
    <>
      <ShoppingCartTable items={shoppingCart.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <OrderSummary />
          <Button
            component={Link}
            to={"/checkout"}
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ShoppingCartPage;
