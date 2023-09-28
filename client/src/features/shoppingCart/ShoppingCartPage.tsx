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
import { useStoreContext } from "../../hooks/useStoreContext";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import apiRequests from "../../app/api/requests";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";

const ShoppingCartPage = () => {
  const { shoppingCart, updateItemQuantity, removeItemFromShoppingCart } =
    useStoreContext();
  const [buttonLoadingState, setButtonLoadingState] = useState({
    loading: false,
    buttonName: "",
  });

  function handlePlusItem(productId: number, buttonName: string, quantity = 1) {
    setButtonLoadingState({ loading: true, buttonName });
    apiRequests.ShoppingCart.addItem(productId)
      .then(() => updateItemQuantity(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setButtonLoadingState({ loading: false, buttonName: "" }));
  }

  function handleMinusItem(
    productId: number,
    buttonName: string,
    quantity = 1
  ) {
    setButtonLoadingState({ loading: true, buttonName });
    apiRequests.ShoppingCart.removeItem(productId, quantity)
      .then(() => removeItemFromShoppingCart(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setButtonLoadingState({ loading: false, buttonName: "" }));
  }

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
                    onClick={() => {
                      handleMinusItem(
                        item.productId,
                        `remove ${item.productId}`
                      );
                    }}
                    loading={
                      buttonLoadingState.loading &&
                      buttonLoadingState.buttonName ===
                        `remove ${item.productId}`
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="primary"
                    onClick={() => {
                      handlePlusItem(item.productId, `add ${item.productId}`);
                    }}
                    loading={
                      buttonLoadingState.loading &&
                      buttonLoadingState.buttonName === `add ${item.productId}`
                    }
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
                    onClick={() => {
                      handleMinusItem(
                        item.productId,
                        `delete ${item.productId}`,
                        item.quantity
                      );
                    }}
                    loading={
                      buttonLoadingState.loading &&
                      buttonLoadingState.buttonName ===
                        `delete ${item.productId}`
                    }
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
