import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ClerkProvider } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/datepicker.css";
import { loadStripe } from "@stripe/stripe-js";
import Script from "next/script";
import { env } from "@learnedlocal/config/env.mjs";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      {/* The following content enables google analytics on our website: */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-M86ZFHHF5R"
        strategy="beforeInteractive"
      />
      <Script strategy="beforeInteractive" id="analyticsScript">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-M86ZFHHF5R'${
          env.NEXT_PUBLIC_GA4_DEBUG_TRUE === "true"
            ? ", { 'debug_mode': true }"
            : ""
        });
      `}
      </Script>

      {/* Page content is wrapped here */}
      <ClerkProvider {...pageProps}>
        <Elements stripe={stripePromise}>
          <NextNProgress
            color="#FFC107"
            startPosition={0.3}
            stopDelayMs={200}
            height={7}
            showOnShallow={false}
          />

          <Component {...pageProps} />
        </Elements>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
