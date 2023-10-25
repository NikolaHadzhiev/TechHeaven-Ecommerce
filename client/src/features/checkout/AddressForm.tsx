import {
  Typography,
  Grid
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/reusable/AppTextInput";
import AppCheckbox from "../../app/reusable/AppCheckbox";

const AddressForm = () => {
  const { control, formState } = useFormContext(); //save Input values after sumbitting between component renders

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name='fullName' label='Full Name' />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name='mainAddress' label='Main Address' />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name='optionalAddress' label='Secondary Address' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='city' label='City' />
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name='state' label='State' />
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name='zipCode' label='Zip code' />
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name='country' label='Country' />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox disabled={!formState.isDirty} name='saveAddress' label="Save this as the default address" control={control}/>
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
