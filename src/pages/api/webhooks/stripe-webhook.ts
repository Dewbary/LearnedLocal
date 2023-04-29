import { RequestHandler, buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "~/server/db";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err: unknown) {
      // On error, log and return the error message.
      const errMsg = (err as Error).message;
      console.log(`❌ Error message: ${errMsg}`);
      res.status(400).send(`Webhook Error: ${errMsg}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message ?? ""}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;
      // Handle successful payment (e.g., update the database)
      console.log(session);

      if (!metadata) {
        throw new Error("Metadata not found");
      }

      if (
        !metadata.userId ||
        !metadata.registrantFirstName ||
        !metadata.registrantLastName ||
        !metadata.partySize ||
        !metadata.email ||
        !metadata.experienceId
      ) {
        throw new Error("Metadata not found");
      }

      const registrationData = {
        userId: metadata.userId,
        registrantFirstName: metadata.registrantFirstName,
        registrantLastName: metadata.registrantLastName,
        partySize: parseInt(metadata.partySize),
        email: metadata.email,
        experienceId: parseInt(metadata.experienceId),
        stripeCheckoutSessionId: session.id,
        status: session.status,
      };

      try {
        const result = await prisma.registration.create({
          data: registrationData,
        });
        console.log(`Registration created with ID: ${result.id}`);
      } catch (error) {
        console.error("Error creating registration:", error);
      }

      console.log(`Payment was successful for session ID: ${session.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as RequestHandler);
