import * as React from "react";
import type { ExperienceInfo } from "~/components/types";
import { getDateToDisplay } from "../DateAndTimePicker/DateAndTimeUtils";

type Props = {
  experience: ExperienceInfo;
  className?: string;
};

const CardInfo = ({ experience, className }: Props) => {
  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="mt-4 flex justify-between">
          <h3 className="truncate text-sm text-gray-700">
            {`${experience.profile?.firstName ?? ""} ${
              experience.profile?.lastName ?? ""
            }`}{" "}
            • {experience.city}
          </h3>

          <p className="text-right text-sm font-medium text-gray-900">
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
