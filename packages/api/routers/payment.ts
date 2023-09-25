import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "packages/api/trpc";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { RegistrationInfo, register } from "packages/api/utils/registration";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        experienceId: z.number(),
        availabilityId: z.number(),
        userId: z.string(),
        registrantFirstName: z.string(),
        registrantLastName: z.string(),
        partySize: z.number(),
        email: z.string(),
        phone: z.string(),
        textNotifications: z.boolean(),
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

      // Check to make sure they're not exceeding the max attendees limit

      const registrations = await ctx.prisma.registration.findMany({
        where: {
          experienceId: input.experienceId,
          availabilityId: input.availabilityId,
        },
      });

      let totalRegistrants = 0;

      registrations.forEach((registration) => {
        totalRegistrants += registration.partySize;
      });

      if (
        totalRegistrants + input.partySize >
        (experience?.maxAttendees || 0)
      ) {
        throw new Error("TOO_MANY_IN_PARTY");
      }

      const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`;
      const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

      if (experience.free) {
        const registrationInfo: RegistrationInfo = {
          userId: input.userId,
          registrantFirstName: input.registrantFirstName,
          registrantLastName: input.registrantLastName,
          partySize: input.partySize,
          email: input.email,
          phone: input.phone,
          textNotificationsEnabled: input.textNotifications,
          experienceId: input.experienceId,
          availabilityId: input.availabilityId,
          stripeCheckoutSessionId: "free",
          status: null,
        };

        await register(registrationInfo, input.availabilityId, input.email);
        return;
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: experience.title,
              },
              unit_amount: Math.round(experience.price * 100 * input.partySize),
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
          phone: input.phone,
          experienceId: input.experienceId,
          availabilityId: input.availabilityId,
        },
      });

      return { sessionId: session.id };
    }),
});
