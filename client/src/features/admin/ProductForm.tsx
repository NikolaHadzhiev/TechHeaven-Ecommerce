import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Product } from "../../app/interfaces/product";
import AppTextInput from "../../app/reusable/AppTextInput";
import { useProducts } from "../../app/hooks/useProducts";
import AppSelectList from "../../app/reusable/AppSelectList";
import AppDropzone from "../../app/reusable/AppDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation/productValidation";
import apiRequests from "../../app/api/requests";
import { useAppDispatch } from "../../app/hooks/reduxHooks";
import { setProduct } from "../../app/store/slices/catalogSlice";
import { LoadingButton } from "@mui/lab";
import './ProductForm.scss'
interface Props {
  product?: Product;
  cancelEdit: () => void;
}

const ProductForm = ({ product, cancelEdit }: Props) => {
  const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({resolver: yupResolver<any>(validationSchema)});
  const { brands, types } = useProducts();
  const watchFile = watch("file", null);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);

    return () => {
      if(watchFile != null) URL.revokeObjectURL(watchFile.preview); //becaue the URL lifetime is tied to the document in the window on which it was created, we call this to prevent memory leak
    }
  }, [product, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Product;

      if(product) {
        response = await apiRequests.Admin.updateProduct(data);
      }else {
        response = await apiRequests.Admin.createProduct(data);
      }

      dispatch(setProduct(response));
      cancelEdit();
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <Box component={Paper} className="product-container">
      <Typography variant="h4" gutterBottom className="product-title">
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
            <Box
              className='product-dropzone'
            >
              <AppDropzone control={control} name="file" />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt="preview"
                  className="product-dropzone-img"
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  className="product-dropzone-img"
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box className='product-dropzone-buttons'>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
          <LoadingButton loading={isSubmitting} variant="contained" color="success" type="submit">
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
