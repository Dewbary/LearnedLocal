import { Experience, Profile } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { Pin } from "~/components/CreateExperience/LocationPicker/LocationPicker";
import { env } from "~/env.mjs";

type Props = {
  recipientEmail: string;
  experience: Experience;
  hostProfile: Profile;
};

sgMail.setApiKey(env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({ recipientEmail, experience, hostProfile }: Props) => {
  const location = experience.location as Pin;
  const lat = location.lat;
  const lng = location.lng;

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-0987664dd3394d89a28b7c758a847b50",
    dynamicTemplateData: {
      hostFirstName: hostProfile.firstName,
      hostLastName: hostProfile.lastName,
      experienceTitle: experience.title,
      hostEmail: hostProfile.email,
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

const sendCancelationEmail = async ({ recipientEmail, experience, hostProfile }: Props) => {
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

export { sendConfirmationEmail, sendCancelationEmail };
