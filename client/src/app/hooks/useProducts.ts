import { useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFiltersAsync } from "../store/slices/catalogSlice";
import { useAppSelector, useAppDispatch } from "./reduxHooks";

export const useProducts = () => {
  const products = useAppSelector(productSelectors.selectAll);

  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    pagination,
  } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();
  
  //use two useEffect hooks to prevent multiple dependencies and multiple API requests
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  return {products, productsLoaded, filtersLoaded, brands, types, pagination}
};
