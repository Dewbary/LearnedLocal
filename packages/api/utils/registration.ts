import prisma from "../db";
import { RegistrationInfo } from "../routers/types";
import { sendConfirmationEmail, sendSignupNotificationEmail } from "./sendgrid";
import sendTextMessage from "./twilio";

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

    if (registrationData.textNotificationsEnabled) {
      const reminderSignupMessage = `Thanks for signing up for ${
        hostProfile?.firstName || ""
      }'s experience, ${
        availabilityInfo?.experience.title || ""
      }! You'll receive reminders about this experience from this number.`;
      await sendTextMessage(registrationResult.phone, reminderSignupMessage);
    }
  } catch (error) {
    console.error("Error creating registration:", error);
  }
};
