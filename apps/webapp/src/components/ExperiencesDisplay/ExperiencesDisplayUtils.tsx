import { ReactNode } from "react";
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
  registered: boolean
): ReactNode => {
  if (experience.isFutureExperience) {
    return <ExperienceSubscribeModalContents experienceInfo={experience} />;
  }
  return (
    <ExperienceDetailModalContents
      experienceInfo={experience}
      showRegisteredDetails={registered}
    />
  );
};
