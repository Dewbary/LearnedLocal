import React from "react";
import { api } from "~/utils/api";
import { loadStripe } from "@stripe/stripe-js";

const TestCheckout = () => {
  const createCheckoutSession = api.payment.createCheckoutSession.useMutation();

  const getStripe = async () => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
    );
    return stripe;
  };

  async function handleCheckout() {
    // if (isLoading) return;
    try {
      createCheckoutSession.mutate(
        { experienceId: 1 },
        {
          onSuccess: async ({ sessionId }) => {
            // Initialize Stripe and redirect to the Checkout
            const stripe = await getStripe();
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
  }

  return (
    <div>
      <h1>Test Checkout</h1>
      {/* <button onClick={handleCheckout} disabled={isLoading}> */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default TestCheckout;
