import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import {
  removeItemAsync,
  addItemAsync,
} from "../../app/store/slices/shoppingCartSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks/reduxHooks";
import { ShoppingItem } from "../../app/interfaces/shoppingItem";

interface Props {
  items: ShoppingItem[];
  isShoppingCart?: boolean;
}

const ShoppingCartTable = ({ items, isShoppingCart = true }: Props) => {
  const { loadingState } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isShoppingCart && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {isShoppingCart && (
                  <LoadingButton
                    color="error"
                    onClick={() => {
                      dispatch(
                        removeItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "remove",
                        })
                      );
                    }}
                    loading={
                      loadingState ===
                      `pendingRemoveItem ${item.productId} remove`
                    }
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isShoppingCart && (
                  <LoadingButton
                    color="primary"
                    onClick={() => {
                      dispatch(addItemAsync({ productId: item.productId }));
                    }}
                    loading={
                      loadingState === `pendingAddItem ${item.productId}`
                    }
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              {isShoppingCart && (
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    onClick={() => {
                      dispatch(
                        removeItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "delete",
                        })
                      );
                    }}
                    loading={
                      loadingState ===
                      `pendingRemoveItem ${item.productId} delete`
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingCartTable;
