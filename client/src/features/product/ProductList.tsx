import { Grid } from "@mui/material";
import { Product } from "../../app/interfaces/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/hooks/reduxHooks";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "./ProductList.scss"


interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id} className="product-list-container">
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
