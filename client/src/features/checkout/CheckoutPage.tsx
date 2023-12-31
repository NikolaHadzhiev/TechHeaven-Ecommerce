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
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { clearShoppingCart } from "../../app/store/slices/shoppingCartSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutPage.scss"

const steps = ["Shipping address", "Review your order", "Payment details"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch(); 
  
  const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?: string}}>({elementError: {}});
  const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false});

  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { shoppingCart } = useAppSelector(state => state.shoppingCart);

  const stripe = useStripe();
  const elements = useElements();

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


  async function submitOrder(data: FieldValues) {
    setLoading(true);
    const {nameOnCard, saveAddress, ...shippingAddress} = data;
    if(!stripe || !elements) return //stripe is not ready

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(shoppingCart?.clientSecret!, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: nameOnCard
          }
        }
      });

      if (paymentResult.paymentIntent?.status === "succeeded") {
        const orderNumber = await apiRequests.Orders.createOrder({saveAddress, shippingAddress});
         
        setOrderNumber(orderNumber);

        setPaymentSucceeded(true);
        setPaymentMessage("Thank you - we have received your payment"); 

        setActiveStep(activeStep + 1);
        dispatch(clearShoppingCart());
        setLoading(false);
      }else {
        setPaymentMessage(paymentResult.error?.message!);
        setPaymentSucceeded(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    }catch(error) {
        console.log(error);
        setLoading(false);
    }
  }

  const handleNext = async (data: FieldValues) => {
    if(activeStep === steps.length - 1) {
      await submitOrder(data);
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
        <Stepper activeStep={activeStep} className="checkout-stepper">
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
                {paymentMessage}
              </Typography>
              {paymentSucceeded ? (
                <Typography variant="subtitle1">
                  Your order number is #{orderNumber}. We will update your order
                  status when your order has been shipped.
                </Typography>
              ) : (
                <Button variant="contained" onClick={handleBack}>
                  Go back and try again
                </Button>
              )}
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box className="checkout-container">
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  loading={loading}
                  disabled={submitDisabled()}
                  variant="contained"
                  type="submit"
                  className="checkout-button"
                >
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
