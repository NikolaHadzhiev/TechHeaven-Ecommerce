import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/reduxHooks";
import ShoppingCartTable from "./ShoppingCartTable";
// import { useStoreContext } from "../../app/hooks/useStoreContext";
// import { updateOrRemoveItemFromShoppingCart } from "../../app/store/slices/shoppingCartSlice";
// import apiRequests from "../../app/api/requests";

const ShoppingCartPage = () => {
  // const { shoppingCart, updateItemQuantity, removeItemFromShoppingCart } = useStoreContext();
  const { shoppingCart} = useAppSelector(state => state.shoppingCart);
 
  // const [buttonLoadingState, setButtonLoadingState] = useState({
  //   loading: false,
  //   buttonName: "",
  // });

  // function handlePlusItem(productId: number, buttonName: string, quantity = 1) {
  //   setButtonLoadingState({ loading: true, buttonName });
  //   apiRequests.ShoppingCart.addItem(productId)
  //     // .then(() => updateItemQuantity(productId, quantity))
  //     .then(() => dispatch(updateOrRemoveItemFromShoppingCart({productId, quantity, indicator: 'add'})))
  //     .catch((error) => console.log(error))
  //     .finally(() => setButtonLoadingState({ loading: false, buttonName: "" }));
  // }

  // function handleMinusItem(
  //   productId: number,
  //   buttonName: string,
  //   quantity = 1
  // ) {
  //   setButtonLoadingState({ loading: true, buttonName });
  //   apiRequests.ShoppingCart.removeItem(productId, quantity)
  //     // .then(() => removeItemFromShoppingCart(productId, quantity))
  //     .then(() => dispatch(updateOrRemoveItemFromShoppingCart({productId, quantity, indicator: 'remove'})))
  //     .catch((error) => console.log(error))
  //     .finally(() => setButtonLoadingState({ loading: false, buttonName: "" }));
  // }

  if (!shoppingCart || shoppingCart.items.length === 0) return <Typography variant="h3">Your shopping cart is empty</Typography>;

  return (
    <>
      <ShoppingCartTable items={shoppingCart.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <OrderSummary />
          <Button component={Link} to={'/checkout'} variant='contained' size='large' fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ShoppingCartPage;
