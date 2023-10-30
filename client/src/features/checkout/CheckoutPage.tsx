import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { validationSchema } from "./validation/checkoutValidation";
import apiRequests from "../../app/api/requests";
import { useAppDispatch } from "../../app/hooks/reduxHooks";
import { clearShoppingCart } from "../../app/store/slices/shoppingCartSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";

const steps = ["Shipping address", "Review your order", "Payment details"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch(); 
  
  const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?: string}}>({elementError: {}});
  const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false});

  function onCardInputChange(event: any) {
    setCardState((prevState) => ({...prevState, elementError: {
      ...prevState.elementError,
      [event.elementType]: event.error?.message
    }}))

    setCardComplete((prevState: any) => ({...prevState, [event.elementType]: event.complete}));
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({mode: 'onTouched', resolver: yupResolver(currentValidationSchema)});

  useEffect(() => {
    apiRequests.Account.savedAddress().then(res => {
      if(res){
        methods.reset({...methods.getValues(), ...res, saveAddress: false})
      }
    })
  }, [methods])

  const handleNext = async (data: FieldValues) => {
    const {nameOnCard, saveAddress, ...shippingAddress} = data;

    if(activeStep === steps.length - 1) {
      setLoading(true);
      try {
        const orderNumber = await apiRequests.Orders.createOrder({saveAddress, shippingAddress});
         
        setOrderNumber(orderNumber);
        setActiveStep(activeStep + 1);

        dispatch(clearShoppingCart());
        setLoading(false);
      }catch(error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function submitDisabled(): boolean {
    if(activeStep === steps.length - 1) {
      return !cardComplete.cardCvc || !cardComplete.cardExpiry || !cardComplete.cardNumber || !methods.formState.isValid
    }
    return !methods.formState.isValid
  }

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We will update your order status when your order has been shipped.
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton loading={loading} disabled={submitDisabled()} variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
};

export default CheckoutPage;
