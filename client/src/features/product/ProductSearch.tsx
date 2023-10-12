import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { setProductParams } from "../../app/store/slices/catalogSlice";
import { useEffect, useState } from "react";
import { useIsMount } from "../../app/hooks/useIsMount";

const ProductSearch = () => {
  const isFirstRender = useIsMount();
  const { productParams} = useAppSelector((state) => state.catalog);
  const [search, setSearch] = useState(productParams.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (isFirstRender || search === undefined) return;
      const debounce = setTimeout(() => {
        dispatch(setProductParams({ search }));
    }, 2000)

    return () => clearTimeout(debounce)
  }, [search, dispatch, isFirstRender])

  
  return (
    <TextField
      label="Search product"
      variant="outlined"
      fullWidth
      value={search || ""}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
};

export default ProductSearch;
