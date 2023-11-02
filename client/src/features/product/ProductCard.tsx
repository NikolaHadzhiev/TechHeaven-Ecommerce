import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/interfaces/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { addItemAsync } from "../../app/store/slices/shoppingCartSlice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  // const [loading, setLoading] = useState(false);
  // const { setShoppingCart } = useStoreContext();
  const {loadingState} = useAppSelector(state => state.shoppingCart)
  const dispatch = useAppDispatch();

  // function handleAddItem(productId: number, quantity = 1) {
  //   setLoading(true);
  //   apiRequests.ShoppingCart.addItem(productId, quantity) //after adding the item the shopping cart is returned from API
  //     // .then(shoppingCart => setShoppingCart(shoppingCart))
  //     .then(shoppingCart => dispatch(setShoppingCart(shoppingCart)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />

      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loadingState === `pendingAddItem ${product.id}` }
          size="small"
          onClick={() => dispatch(addItemAsync({productId: product.id}))}
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
