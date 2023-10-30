import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/hooks/reduxHooks";
import { useEffect, useState } from "react";
import apiRequests from "../../app/api/requests";
import { setShoppingCart } from "../../app/store/slices/shoppingCartSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51O5qUzBi5vHu526NBvuS3HK8YOlYAdq78fVtBI6w2n2xKgtoWPUqp5y97tm8ipVTc7vWiJ9z2XUdGhJ4MtXTo8Y500D0dB15pm')

const CheckoutWrapper = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        apiRequests.Payments.createPaymentIntent()
                   .then(sc => dispatch(setShoppingCart(sc)))
                   .catch(error => console.log(error))
                   .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <LoadingComponent message="Loading checkout... 🥱"/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}

export default CheckoutWrapper;