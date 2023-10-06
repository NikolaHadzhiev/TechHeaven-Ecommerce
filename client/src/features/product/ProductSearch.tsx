import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { setProductParams } from "../../app/store/slices/catalogSlice";
import { useEffect, useState } from "react";

const ProductSearch = () => {
  const { productParams} = useAppSelector((state) => state.catalog);
  const [search, setSearch] = useState(productParams.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (search === undefined) return;
      const debounce = setTimeout(() => {
        dispatch(setProductParams({ search }));
    }, 1500)

    return () => clearTimeout(debounce)
  }, [search, dispatch])

  
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
