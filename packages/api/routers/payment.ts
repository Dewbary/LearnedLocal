import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import Stripe from "stripe";
import { env } from "@learnedlocal/config/env.mjs";
import { register } from "../utils/registration";
import {
  checkMaxAttendeesLimit,
  createCheckoutSessionObject,
} from "../utils/stripeUtils";
import { createFreeRegistrationInfo } from "../utils/freeExpUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
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

      await checkMaxAttendeesLimit(ctx, input, experience);

      if (experience.free) {
        await register(
          createFreeRegistrationInfo(input),
          input.availabilityId,
          input.email
        );
        return;
      }

      const session = await stripe.checkout.sessions.create(
        createCheckoutSessionObject(experience, input)
      );

      return { sessionId: session.id };
    }),
});
