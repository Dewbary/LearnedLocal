import * as React from "react";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { getDateToDisplay } from "../DateAndTimePicker/DateAndTimeUtils";

type Props = {
  experience: ExperienceInfo;
  className?: string;
};

const CardInfo = ({ experience, className }: Props) => {
  let hostName: string | null;

  if (experience.isExternalListing) {
    hostName = experience.externalHostName;
  } else {
    hostName = experience.profile?.firstName || "";
    hostName += " ";
    hostName += experience.profile?.lastName || "";
  }

  const displayHostName = hostName;

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="mt-4 flex justify-between">
          <h3 className="shrink truncate text-sm text-gray-700">
            {displayHostName} • {experience.city}
          </h3>

          <p className="shrink-0 text-right text-sm font-medium text-gray-900">
            {getDateToDisplay(experience)}
          </p>
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {experience.title}
        </p>
      </div>
    </div>
  );
};

export default CardInfo;
