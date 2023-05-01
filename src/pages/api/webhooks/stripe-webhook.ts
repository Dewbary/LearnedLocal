import { prisma } from "~/server/db";
import { sendConfirmationEmail } from "~/utils/sendgrid";
import getRawBody from "raw-body";
import { env } from "~/env.mjs";

import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  const webhookSecret: string = env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
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
        !metadata.experienceId
      ) {
        throw new Error("Metadata not found");
      }

      const experienceId = parseInt(metadata.experienceId);

      // Start by creating the registration object in the database.
      const registrationData = {
        userId: metadata.userId,
        registrantFirstName: metadata.registrantFirstName,
        registrantLastName: metadata.registrantLastName,
        partySize: parseInt(metadata.partySize),
        email: metadata.email,
        experienceId: experienceId,
        stripeCheckoutSessionId: session.id,
        status: session.status,
      };

      try {
        const result = await prisma.registration.create({
          data: registrationData,
        });
        console.log(`Registration created with ID: ${result.id}`);

        // Registration successfully created, let's send a confirmation email to the user
        const experience = await prisma.experience.findFirst({
          where: { id: experienceId },
        });

        if (experience) {
          await sendConfirmationEmail({
            recipientEmail: metadata.email,
            experience: experience,
          });
        }
      } catch (error) {
        console.error("Error creating registration:", error);
      }

      console.log(`Payment was successful for session ID: ${session.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

export default handler;
