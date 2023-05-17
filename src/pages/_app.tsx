import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ClerkProvider } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout/Layout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ClerkProvider {...pageProps}>
      <Elements stripe={stripePromise}>
        <NextNProgress
          color="#FFC107"
          startPosition={0.3}
          stopDelayMs={200}
          height={7}
          showOnShallow={false}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
