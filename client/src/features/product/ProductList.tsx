import { Grid } from "@mui/material"
import { Product } from "../../app/interfaces/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const ProductList = ({products}: Props) =>  {
    return (
        <Grid container spacing={4}>
        {products.map((product) => (
            <Grid item xs={4} key={product.id} sx={{mb: '1px'}}>
                <ProductCard product={product} />
            </Grid>
        ))}
      </Grid>
    )
}

export default ProductList