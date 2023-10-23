import {
  Profile,
  Registration,
} from "@learnedlocal/db";
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

sgMail.setApiKey(env.SENDGRID_API_KEY ?? "");
sgClient.setApiKey(env.SENDGRID_API_KEY ?? "");

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
  const experienceStartTime = availabilityInfo?.startTime;

  if (!experienceDate || !experienceStartTime) return;

  const combinedDate = combineDates(experienceDate, experienceStartTime);

  const experienceDateTimeString = combinedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Denver"
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

    const experienceDate = props.experience.availability.at(0)?.date;
    const experienceStartTime = props.experience.availability.at(0)?.startTime;

    if (!experienceDate || !experienceStartTime)
      throw "No time associated with availibility from sendExperienceCreationEmail";

    const combinedDate = combineDates(experienceDate, experienceStartTime);

    const millisUntilExperience =
      combinedDate.getTime() - startOfToday().getTime();
    const daysUntilExperience = Math.ceil(
      millisUntilExperience / (1000 * 60 * 60 * 24)
    );

    const experienceDateTimeString = combinedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

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

const combineDates = (experienceDate: Date, experienceStartTime: Date) => {
  const year = experienceDate.getFullYear();
  const month = experienceDate.getMonth();
  const day = experienceDate.getDate();

  const hours = experienceStartTime.getHours();
  const minutes = experienceStartTime.getMinutes();
  const seconds = experienceStartTime.getSeconds();

  return new Date(year, month, day, hours, minutes, seconds);
};

export {
  sendConfirmationEmail,
  sendCancelationEmail,
  sendSignupNotificationEmail,
  sendExperienceCreationEmail,
  addContactToListWithExperience,
};
