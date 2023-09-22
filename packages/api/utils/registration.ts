import prisma from "../db";
import { sendConfirmationEmail, sendSignupNotificationEmail } from "./sendgrid";
import Stripe from "stripe";

export type RegistrationInfo = {
  userId: string;
  registrantFirstName: string;
  registrantLastName: string;
  partySize: number;
  email: string;
  phone: string;
  experienceId: number;
  availabilityId: number;
  stripeCheckoutSessionId: string;
  status: Stripe.Checkout.Session.Status | null;
};

export const register = async (
  registrationData: RegistrationInfo,
  availabilityId: number,
  recipientEmail: string
) => {
  try {
    const registrationResult = await prisma.registration.create({
      data: registrationData,
    });
    console.log(`Registration created with ID: ${registrationResult.id}`);

    // Registration successfully created, let's send a confirmation email to the user
    const availabilityInfo = await prisma.experienceAvailability.findFirst({
      where: { id: availabilityId },
      include: {
        experience: {
          include: { profile: true },
        },
      },
    });

    const hostProfile = await prisma.profile.findFirst({
      where: { userId: availabilityInfo?.experience?.authorId },
    });

    if (availabilityInfo && hostProfile) {
      await sendConfirmationEmail({
        recipientEmail: recipientEmail,
        availabilityInfo,
        hostProfile: hostProfile,
      });

      await sendSignupNotificationEmail({
        recipientEmail: hostProfile.email ?? "",
        availabilityInfo,
        registration: registrationResult,
      });
    }
  } catch (error) {
    console.error("Error creating registration:", error);
  }
};
