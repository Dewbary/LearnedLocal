import React from "react";
import { api } from "~/utils/api";
import { useStripe } from "@stripe/react-stripe-js";

const PaymentButton = () => {
  const stripe = useStripe();
  const createCheckoutSession = api.payment.createCheckoutSession.useMutation();

  // const getStripe = async () => {
  //   console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  //   const stripe = await loadStripe(
  //     process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
  //   );
  //   return stripe;
  // };

  const handleClick = async () => {
    if (!stripe) {
      console.error("Stripe is not initialized");
      return;
    }

    try {
      createCheckoutSession.mutate(
        { experienceId: 1 },
        {
          onSuccess: async ({ sessionId }) => {
            // Initialize Stripe and redirect to the Checkout
            if (stripe) {
              stripe.redirectToCheckout({ sessionId });
            } else {
              console.error("Stripe failed to initialize");
            }
          },
          onError: (error) => {
            console.error("Error creating checkout session:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={!stripe}>
      Sign Up
    </button>
  );
};

export default PaymentButton;
