import { useEffect, useState } from "react";
import { ShoppingCart } from "../../app/interfaces/shoppingCart";
import apiRequests from "../../app/api/requests";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCart.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color='error'>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ShoppingCartPage;
