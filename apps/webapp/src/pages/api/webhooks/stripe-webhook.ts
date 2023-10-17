import getRawBody from "raw-body";
import { env } from "~/env.mjs";

import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { RegistrationInfo, register } from "@learnedlocal/api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  const webhookSecret: string = env.STRIPE_WEBHOOK_SECRET;
  console.log("WEBHOOK SECRET: ", webhookSecret);

  if (req.method === "POST") {
    const buf = await getRawBody(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    if (!sig) {
      console.log("sig error");
      return;
    }

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err: unknown) {
      const errMsg = (err as Error).message;
      // On error, log and return the error message
      console.log(`❌ Error message: ${errMsg}`);
      res.status(400).send(`Webhook Error: ${errMsg}`);
      return;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object
    if (event.type === "payment_intent.succeeded") {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      // Handle successful payment (e.g., update the database)

      if (!metadata) {
        throw new Error("Metadata not found");
      }

      if (
        !metadata.userId ||
        !metadata.registrantFirstName ||
        !metadata.registrantLastName ||
        !metadata.partySize ||
        !metadata.email ||
        !metadata.phone ||
        !metadata.textNotifications ||
        !metadata.experienceId ||
        !metadata.availabilityId
      ) {
        console.log({ errorMessage: "error: metadata not constructed properly", metadata });
        throw new Error("Metadata not properly constructed");
      }

      const experienceId = parseInt(metadata.experienceId);
      const availabilityId = parseInt(metadata.availabilityId);
      const textNotifications = metadata.textNotifications === "true";

      // Start by creating the registration object in the database.
      const registrationInfo: RegistrationInfo = {
        userId: metadata.userId,
        registrantFirstName: metadata.registrantFirstName,
        registrantLastName: metadata.registrantLastName,
        partySize: parseInt(metadata.partySize),
        email: metadata.email,
        phone: metadata.phone,
        textNotificationsEnabled: textNotifications,
        experienceId: experienceId,
        availabilityId: availabilityId,
        stripeCheckoutSessionId: session.id,
        status: session.status,
      };

      await register(registrationInfo, availabilityId, metadata.email);

      console.log(`Payment was successful for session ID: ${session.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method Not Allowed. You used ${req.method || "[no method found]"}`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
