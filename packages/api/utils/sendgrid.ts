import { Profile, Registration } from "@learnedlocal/db";
import type {
  ExperienceInfo,
  AvailabilityInfo,
  Pin,
} from "@learnedlocal/db/types/types";
import sgMail from "@sendgrid/mail";
import sgClient from "@sendgrid/client";
import { env } from "@learnedlocal/config/env.mjs";
import { startOfToday } from "date-fns";

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
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
sgClient.setApiKey(process.env.SENDGRID_API_KEY ?? "");

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

  const experienceStartTime = availabilityInfo?.startTime;

  if (!experienceStartTime) return;

  const experienceDateTimeString = experienceStartTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Denver",
  });

  const msg = {
    to: recipientEmail,
    from: "learnedlocal.app@gmail.com",
    templateId: "d-0987664dd3394d89a28b7c758a847b50",
    dynamicTemplateData: {
      hostFirstName: hostProfile.firstName,
      hostLastName: hostProfile.lastName,
      experienceTitle: availabilityInfo.experience?.title,
      hostEmail: hostProfile.email,
      experienceDate: experienceDateTimeString,
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

const sendExperienceCreationEmail = async (
  props: NewExperienceNotificationProps
) => {
  try {
    if (!props.experience)
      throw "No experience passed to sendExperienceCreationEmail";
    if (props.experience.availability.length <= 0)
      throw "No availabilities with this experience in sendExperienceCreationEmail";

    const experienceStartTime = props.experience.availability.at(0)?.startTime;

    if (!experienceStartTime)
      throw "No time associated with availibility from sendExperienceCreationEmail";

    const millisUntilExperience =
      experienceStartTime.getTime() - startOfToday().getTime();
    const daysUntilExperience = Math.ceil(
      millisUntilExperience / (1000 * 60 * 60 * 24)
    );

    const experienceDateTimeString = experienceStartTime.toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );

    const msg = {
      to: "learnedlocal.app@gmail.com",
      from: "learnedlocal.app@gmail.com",
      templateId: "d-eb7a4533678c4ffa81f9aab80bafaa7b",
      dynamicTemplateData: {
        firstname: props.experience.profile?.firstName,
        lastname: props.experience.profile?.lastName,
        title: props.experience.title,
        date: `${experienceDateTimeString} (in ${daysUntilExperience} days)`,
      },
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

const addContactToListWithExperience = async (
  newContactEmail: string,
  experienceTitle: string
) => {
  const data = {
    list_ids: ["37be6b20-29e5-40c3-ac3d-f06d53bd8373"],
    contacts: [
      {
        email: newContactEmail,
        custom_fields: {
          remind_experience_title: experienceTitle,
        },
      },
    ],
  };

  await sgClient
    .request({
      url: "/v3/marketing/contacts",
      method: "PUT",
      body: data,
    })
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    })
    .catch((error) => {
      console.error(error);
    });
};

const addContactToExperienceWaitlist = async ({
  experienceTitle,
  newContactFirstName,
  newContactLastName,
  newContactEmail,
  newContactPhoneNumber
} : {
  experienceTitle: string,
  newContactFirstName: string,
  newContactLastName: string,
  newContactEmail: string,
  newContactPhoneNumber: string
}) => {
  const data = {
    list_ids: ["9f0efaa5-65d9-425b-9b7e-e40f0c4759e5"],
    contacts: [
      {
        first_name: newContactFirstName,
        last_name: newContactLastName,
        email: newContactEmail,
        phone_number: newContactPhoneNumber,
        custom_fields: {
          experience_title: experienceTitle,
        },
      },
    ],
  };

  await sgClient
    .request({
      url: "/v3/marketing/contacts",
      method: "PUT",
      body: data,
    })
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    })
    .catch((error) => {
      console.error(error);
    });
};

export {
  sendConfirmationEmail,
  sendCancelationEmail,
  sendSignupNotificationEmail,
  sendExperienceCreationEmail,
  addContactToListWithExperience,
  addContactToExperienceWaitlist
};
