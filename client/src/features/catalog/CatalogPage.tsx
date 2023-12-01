import { Grid, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  setPageNumber,
  setProductParams,
} from "../../app/store/slices/catalogSlice";
import ProductList from "../product/ProductList";
import ProductSearch from "../product/ProductSearch";
import ProductSort from "../product/ProductSort";
import ProductFilter from "../product/ProductFilter";
import AppPagination from "../../app/layout/AppPagination";
import { useProducts } from "../../app/hooks/useProducts";
import "./CatalogPage.scss"

const sortOptions = [
  { value: "name", label: "Alphanetical" },
  { value: "price", label: "Price - Low to High" },
  { value: "priceDesc", label: "Price - High to Low" },
];

const Catalog = () => {
  const { products, brands, types, filtersLoaded, pagination } = useProducts();
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded)
    return <LoadingComponent message="Loading products... 🥱" />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Typography variant={"h5"} className="filter-text">
          Search
        </Typography>
        <Paper className="catalog-search">
          <ProductSearch />
        </Paper>
        <Typography variant={"h5"} className="filter-text">
          Sort
        </Typography>
        <Paper className="catalog-filters">
          <ProductSort
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) =>
              dispatch(
                setProductParams({
                  orderBy: event.target.value,
                  resetPageNumber: false,
                })
              )
            }
          />
        </Paper>
        <Typography variant={"h5"} className="filter-text">
          Brands
        </Typography>
        <Paper className="catalog-filters">
          <ProductFilter
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Typography variant={"h5"} className="filter-text">
          Types
        </Typography>
        <Paper className="catalog-filters">
          <ProductFilter
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9} className="catalog-list">
        <ProductList products={products} />
        <Grid container className='catalog-pagination'>
          <Grid item xs={12}>
            {pagination && (
              <AppPagination
                pagination={pagination}
                onPageChange={(page: number) => {
                  dispatch(setPageNumber({ currentPageNumber: page }));
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
