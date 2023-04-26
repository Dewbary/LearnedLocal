// pages/api/stripe-webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Get the raw payload from the request
    const payload = await new Promise<string>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("error", (err) => reject(err));
      req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });

    const signature = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: unknown) {
      const errMsg = (err as Error).message;
      console.error(`⚠️ Webhook signature verification failed.`, errMsg);
      return res.status(400).send(`Webhook Error: ${errMsg}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful payment (e.g., update the database)
        console.log(`Payment was successful for session ID: ${session.id}`);
        break;

      // Add more cases for other events if needed

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 OK status to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
