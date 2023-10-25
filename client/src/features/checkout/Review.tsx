import { Grid, Typography } from "@mui/material";
import OrderSummary from "../shoppingCart/OrderSummary";
import ShoppingCartTable from "../shoppingCart/ShoppingCartTable";
import { useAppSelector } from "../../app/hooks/reduxHooks";

const Review = () => {
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {shoppingCart && (
        <ShoppingCartTable items={shoppingCart.items} isShoppingCart={false} />
      )}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <OrderSummary />
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
