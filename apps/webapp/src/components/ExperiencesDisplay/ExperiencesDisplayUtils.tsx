import type { ReactNode } from "react";
import ExperienceDetailModalContents from "../common/ExperienceDetailModalContents";
import ExperienceSubscribeModalContents from "../common/ExperienceSubscribeModalContents";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";

export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getModalImpl = (
  experience: ExperienceInfo,
  registered: boolean,
  isPastExperience: boolean
): ReactNode => {
  if (experience.isFutureExperience || isPastExperience) {
    return <ExperienceSubscribeModalContents experienceInfo={experience} />;
  }
  return (
    <ExperienceDetailModalContents
      experienceInfo={experience}
      showRegisteredDetails={registered}
    />
  );
};
