import { Experience, Profile, Registration } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { Pin } from "~/components/CreateExperience/LocationPicker/LocationPicker";
import { env } from "~/env.mjs";
import { format } from "date-fns";
import { ExperienceInfo } from "~/components/types";

type Props = {
  recipientEmail: string;
  experience: ExperienceInfo;
  hostProfile?: Profile;
  registration?: Registration;
};

sgMail.setApiKey(env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({
  recipientEmail,
  experience,
  registration,
  hostProfile,
}: Props) => {
  if (!hostProfile) {
    return;
  }

  const location = experience.location as Pin;
  const lat = location.lat;
  const lng = location.lng;

  const experienceDate = experience.availability.filter((date) => {
    date.id === registration?.availabilityId;
  });

  if (!experienceDate || !experienceDate[0] || !experienceDate[0].date) {
    return;
  }
  const experienceDateTime = format(
    experienceDate[0].date,
    "EEEE, MMM Lo 'at' h:mm a"
  );

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-0987664dd3394d89a28b7c758a847b50",
    dynamicTemplateData: {
      hostFirstName: hostProfile.firstName,
      hostLastName: hostProfile.lastName,
      experienceTitle: experience.title,
      hostEmail: hostProfile.email,
      experienceDate: experienceDateTime,
      experienceLocation:
        lat && lng
          ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
          : "",
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendCancelationEmail = async ({
  recipientEmail,
  experience,
  hostProfile,
}: Props) => {
  if (!hostProfile) {
    return;
  }

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-a621cf8b9ffd49faae9ccf9b6653bcc9",
    dynamicTemplateData: {
      hostFirstName: hostProfile.firstName,
      hostLastName: hostProfile.lastName,
      experienceTitle: experience.title,
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendSignupNotificationEmail = async ({
  recipientEmail,
  experience,
  registration,
}: Props) => {
  if (!registration) {
    return;
  }

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-385cc172217743aebdff2213838f01d8",
    dynamicTemplateData: {
      experienceTitle: experience.title,
      registrantFirst: registration.registrantFirstName,
      registrantLast: registration.registrantLastName,
      registrantEmail: registration.email,
      registrantPhone: registration.phone,
      partySize: registration.partySize,
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

export {
  sendConfirmationEmail,
  sendCancelationEmail,
  sendSignupNotificationEmail,
};
