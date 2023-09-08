import { Experience, Profile, Registration } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { Pin } from "~/components/CreateExperience/LocationPicker/LocationPicker";
import { env } from "~/env.mjs";
import { format, startOfToday } from "date-fns";
import type { AvailabilityInfo, ExperienceInfo } from "~/components/types";

type Props = {
  recipientEmail: string;
  availabilityInfo: AvailabilityInfo;
  hostProfile?: Profile;
  registration?: Registration;
};

type CancellationProps = {
  recipientEmail: string;
  experience: ExperienceInfo;
  hostProfile?: Profile;
  registration?: Registration;
};

type NewExperienceNotificationProps = {
  experience: ExperienceInfo;
}

sgMail.setApiKey(env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({
  recipientEmail,
  availabilityInfo,
  registration,
  hostProfile,
}: Props) => {
  if (!hostProfile || !availabilityInfo) {
    return;
  }

  const location = availabilityInfo.experience?.location as Pin;
  const lat = location.lat;
  const lng = location.lng;

  const experienceDate = availabilityInfo?.date;

  if (!experienceDate) return;

  const experienceDateTime = format(experienceDate, "EEEE, MMM do 'at' h:mm a");

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-0987664dd3394d89a28b7c758a847b50",
    dynamicTemplateData: {
      hostFirstName: hostProfile.firstName,
      hostLastName: hostProfile.lastName,
      experienceTitle: availabilityInfo.experience?.title,
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
}: CancellationProps) => {
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
  availabilityInfo,
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
      experienceTitle: availabilityInfo?.experience?.title,
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

const sendExperienceCreationEmail = async (props: NewExperienceNotificationProps) => {
  try {
    if (!props.experience) throw "No experience passed to sendExperienceCreationEmail";
    if (props.experience.availability.length <= 0) throw "No availabilities with this experience in sendExperienceCreationEmail";

    const experienceDate = props.experience.availability.at(0)?.date;
    if (experienceDate === undefined || experienceDate === null) throw "No time associated with availibility from sendExperienceCreationEmail";

    const millisUntilExperience = experienceDate.getTime() - startOfToday().getTime();
    const daysUntilExperience = Math.ceil(millisUntilExperience / ( 1000 * 60 * 60 * 24 ));

    const experienceDateTimeString = format(experienceDate, "EEEE, MMM do");

    const msg = {
      to: "learnedlocal.app@gmail.com",
      from: "learnedlocal.app@gmail.com",
      templateId: "d-eb7a4533678c4ffa81f9aab80bafaa7b",
      dynamicTemplateData: {
        firstname: props.experience.profile?.firstName,
        lastname: props.experience.profile?.lastName,
        title: props.experience.title,
        date: `${experienceDateTimeString} (in ${daysUntilExperience} days)`
      },
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
  catch (error) {
    console.error(error);
  }
};

export {
  sendConfirmationEmail,
  sendCancelationEmail,
  sendSignupNotificationEmail,
  sendExperienceCreationEmail
};
