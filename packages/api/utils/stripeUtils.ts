import { Experience } from "packages/db";
import { CheckoutMetadata } from "../routers/types";
import { Stripe } from "stripe";
import { AppContext } from "../types";

const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`;
const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

export const createCheckoutSessionObject = (
  experience: Experience,
  input: CheckoutMetadata
): Stripe.Checkout.SessionCreateParams => ({
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
    textNotifications: input.textNotifications ? "true" : "false",
  },
});

export const checkMaxAttendeesLimit = async (
  ctx: AppContext,
  input: CheckoutMetadata,
  experience: Experience
) => {
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

  if (totalRegistrants + input.partySize > (experience?.maxAttendees || 0)) {
    throw new Error("TOO_MANY_IN_PARTY");
  }
};
