import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Product } from "../../app/interfaces/product";
import AppTextInput from "../../app/reusable/AppTextInput";
import { useProducts } from "../../app/hooks/useProducts";
import AppSelectList from "../../app/reusable/AppSelectList";
import AppDropzone from "../../app/reusable/AppDropzone";

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

const ProductForm = ({ product, cancelEdit }: Props) => {
  const { control, reset, handleSubmit } = useForm();
  const { brands, types } = useProducts();

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  function handleSubmitData(data: FieldValues) {
    console.log(data);
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={brands}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={types}
              name="type"
              label="Type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <AppDropzone control={control} name="file" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="success" type='submit'>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
