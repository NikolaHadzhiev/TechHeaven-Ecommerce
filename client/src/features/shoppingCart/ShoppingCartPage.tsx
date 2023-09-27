import {
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

const ShoppingCartPage = () => {
  const { shoppingCart, updateItemQuantity, removeItemFromShoppingCart } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handlePlusItem(productId: number, quantity = 1){
    setLoading(true);
    apiRequests.ShoppingCart.addItem(productId)
        .then(() => updateItemQuantity(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
  }

  function handleMinusItem(productId: number, quantity = 1){
    setLoading(true);
    apiRequests.ShoppingCart.removeItem(productId, quantity)
        .then(() => removeItemFromShoppingCart(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
  }

  if (!shoppingCart || shoppingCart.items.length === 0)
    return <Typography variant="h3">Your shopping cart is empty</Typography>;

  return (
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
                <LoadingButton color="error" onClick={() => {handleMinusItem(item.productId)}} loading={loading}>
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton color="primary" onClick={() => {handlePlusItem(item.productId)}} loading={loading}>
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <LoadingButton color="error" onClick={() => {handleMinusItem(item.productId, item.quantity)}} loading={loading}>
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingCartPage;
