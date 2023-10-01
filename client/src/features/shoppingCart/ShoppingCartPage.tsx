import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
// import { useStoreContext } from "../../app/hooks/useStoreContext";
// import apiRequests from "../../app/api/requests";
import { LoadingButton } from "@mui/lab";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { addItemAsync, removeItemAsync } from "../../app/store/slices/shoppingCartSlice";
// import { updateOrRemoveItemFromShoppingCart } from "../../app/store/slices/shoppingCartSlice";

const ShoppingCartPage = () => {
  // const { shoppingCart, updateItemQuantity, removeItemFromShoppingCart } = useStoreContext();
  const { shoppingCart, loadingState} = useAppSelector(state => state.shoppingCart);
  const dispatch = useAppDispatch();
 
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

  if (!shoppingCart || shoppingCart.items.length === 0)
    return <Typography variant="h3">Your shopping cart is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingCart.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    onClick={() => {dispatch(removeItemAsync({productId: item.productId, quantity: 1, name: 'remove'}))}}
                    loading={loadingState === `pendingRemoveItem ${item.productId} remove`}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="primary"
                    onClick={() => {dispatch(addItemAsync({productId: item.productId}))}}
                    loading={loadingState === `pendingAddItem ${item.productId}`}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    onClick={() => {dispatch(removeItemAsync({productId: item.productId, quantity: item.quantity, name: 'delete'}))}}
                    loading={loadingState === `pendingRemoveItem ${item.productId} delete`}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
