import { Grid } from "@mui/material";
import { Product } from "../../app/interfaces/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/hooks/reduxHooks";
import ProductCardSkeleton from "./ProductCardSkeleton";



interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id} sx={{ mb: "5px" }}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
