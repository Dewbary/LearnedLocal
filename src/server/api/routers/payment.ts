import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        experienceId: z.number(),
        userId: z.string(),
        registrantFirstName: z.string(),
        registrantLastName: z.string(),
        partySize: z.number(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const experience = await ctx.prisma.experience.findUnique({
        where: { id: input.experienceId },
      });

      if (!experience) {
        throw new Error("Experience not found");
      }

      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not set");
      }

      const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success/success`;
      const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: experience.title,
              },
              unit_amount: experience.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: input.userId,
          registrantFirstName: input.registrantFirstName,
          registrantLastName: input.registrantLastName,
          partySize: input.partySize,
          email: input.email,
          experienceId: input.experienceId,
        },
      });

      return { sessionId: session.id };
    }),
});
