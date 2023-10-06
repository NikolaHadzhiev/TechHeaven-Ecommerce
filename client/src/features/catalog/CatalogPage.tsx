import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "../../app/store/slices/catalogSlice";
import ProductList from "../product/ProductList";
import { useEffect } from "react";
import ProductSearch from "../product/ProductSearch";
import ProductSort from "../product/ProductSort";

const sortOptions = [
  { value: "name", label: "Alphanetical" },
  { value: "price", label: "Price - Low to High" },
  { value: "priceDesc", label: "Price - High to Low" },
];

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    loadingStatus,
    filtersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<Product[]>([])
  // const [loading, setLoading] = useState(true);

  //use two useEffect hooks to prevent multiple dependencies and multiple API requests
  useEffect(() => {
    // apiRequests.Catalog.list()
    //         .then(products => setProducts(products))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  if (loadingStatus.includes("pending"))
    return <LoadingComponent message="Loading products... 🥱" />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          Search
        </Typography>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          Sort
        </Typography>
        <Paper sx={{ mb: 2, p: 2 }}>
          <ProductSort
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
          />
        </Paper>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          Brands
        </Typography>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand}
                key={brand}
              />
            ))}
          </FormGroup>
        </Paper>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          Types
        </Typography>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9} sx={{ display: "flex", flexDirection: "column" }}>
        <ProductList products={products} />
        <Grid container sx={{ mt: "auto" }}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography>Displaying 1-6 of 20 items</Typography>
              <Pagination color="primary" size="large" count={10} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
