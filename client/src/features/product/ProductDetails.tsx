import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { addItemAsync, removeItemAsync} from "../../app/store/slices/shoppingCartSlice";
import { fetchProductAsync, productSelectors } from "../../app/store/slices/catalogSlice";
import "./ProductDetails.scss"

const ProductDetails = () => {
  const {shoppingCart, loadingState} = useAppSelector(state => state.shoppingCart);
  const {loadingStatus: productLoadingState} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state, id!))
  const [quantity, setQuantity] = useState(0);
  
  const shoppingCartItem = shoppingCart?.items.find(
    (i) => i.productId === product?.id
  );

  useEffect(() => {
    if (shoppingCartItem) setQuantity(shoppingCartItem.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)))
  }, [id, shoppingCartItem, dispatch, product]);

  function handleChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!shoppingCartItem || quantity > shoppingCartItem.quantity) {
      const addQuantity = shoppingCartItem ? quantity - shoppingCartItem.quantity : quantity;
      dispatch(addItemAsync({productId: product?.id!, quantity: addQuantity}))

    } else {
      const removeQuantity = shoppingCartItem.quantity - quantity;
      dispatch(removeItemAsync({productId: product?.id!, quantity: removeQuantity}))
    }
  }

  if (productLoadingState.includes('pending')) return <LoadingComponent message="Loading product... Please wait 🥱" />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={10}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          className="product-details-image"
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider className="product-details-divider" />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              type="number"
              label="Cart quantity"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={(shoppingCartItem?.quantity === quantity) || (!shoppingCartItem && quantity === 0)}
              loading={loadingState.includes('pending')}
              onClick={handleUpdateCart}
              className="product-details-button"
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {shoppingCartItem ? "Update quantity in cart" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
