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
import { Product } from "../../app/interfaces/product";
import apiRequests from "../../app/api/requests";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
// import { useStoreContext } from "../../app/hooks/useStoreContext";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { addItemAsync, removeItemAsync} from "../../app/store/slices/shoppingCartSlice";

const ProductDetails = () => {
  // const { shoppingCart, setShoppingCart, removeItemFromShoppingCart } = useStoreContext();
  const {shoppingCart, loadingState} = useAppSelector(state => state.shoppingCart);
  const dispatch = useAppDispatch();
  
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  // const [submitting, setSubmitting] = useState(false);

  const shoppingCartItem = shoppingCart?.items.find(
    (i) => i.productId === product?.id
  );

  useEffect(() => {
    if (shoppingCartItem) setQuantity(shoppingCartItem.quantity);

    id &&
      apiRequests.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, shoppingCartItem]);

  function handleChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!shoppingCartItem || quantity > shoppingCartItem.quantity) {
      const addQuantity = shoppingCartItem ? quantity - shoppingCartItem.quantity : quantity;

      // apiRequests.ShoppingCart.addItem(product?.id!, addQuantity)
      //   // .then(shoppingCart => setShoppingCart(shoppingCart))
      //   .then(shoppingCart => dispatch(setShoppingCart(shoppingCart)))
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));

      dispatch(addItemAsync({productId: product?.id!, quantity: addQuantity}))

    } else {
      const removeQuantity = shoppingCartItem.quantity - quantity;
      dispatch(removeItemAsync({productId: product?.id!, quantity: removeQuantity}))
      // apiRequests.ShoppingCart.removeItem(product?.id!, removeQuantity)
      //   // .then(() => removeItemFromShoppingCart(product?.id!, removeQuantity))
      //   .then(() => dispatch(updateOrRemoveItemFromShoppingCart({productId: product?.id!, quantity: removeQuantity, indicator: 'remove'})))
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));


    }
  }

  if (loading)
    return <LoadingComponent message="Loading product... Please wait 🥱" />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={10}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
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
              sx={{ height: "55px" }}
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
