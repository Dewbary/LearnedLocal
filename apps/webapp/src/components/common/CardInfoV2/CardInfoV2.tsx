import type { ExperienceInfo } from "packages/db/types/types";
import * as React from "react";
import ExperienceDate from "./ExperienceDate";
import { ExperienceAvailability } from "packages/db";

type Props = {
  className?: string;
  experience: ExperienceInfo;
  availabilities: ExperienceAvailability[];
};

const CardInfoV2 = ({ className, experience, availabilities }: Props) => {
  return (
    <div
      className={`${
        className ?? ""
      } rounded-2xl bg-ll-black px-4 py-2 text-white`}
    >
      <div className="truncate font-raleway font-bold">{experience.title}</div>
      <div className="font-inter font-[250]">
        <ExperienceDate
          availabilities={availabilities}
          isFutureExperience={experience.isFutureExperience}
        />
      </div>
      <div className="font-inter font-[250]">{experience.city}, UT</div>

      <div className="absolute bottom-4 right-4 cursor-pointer rounded-full bg-ll-grey p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          color="black"
          height="20"
          width="20"
          stroke="black"
          strokeWidth={1.5}
        >
          <path
            fillRule="evenodd"
            d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default CardInfoV2;
