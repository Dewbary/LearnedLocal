import { format } from "date-fns";
import type { ExperienceAvailability } from "packages/db";
import * as React from "react";

type Props = {
  availabilities: ExperienceAvailability[];
  isFutureExperience: boolean;
};

const ExperienceDate = ({ availabilities, isFutureExperience }: Props) => {
  if (isFutureExperience) {
    return <>Upcoming</>;
  }

  if (availabilities.length === 0) {
    return <></>;
  }

  return (
    <>
      {availabilities.length > 1 ? (
        <div className="flex items-center">
          {format(availabilities[0]?.startTime ?? new Date(), "MMMM d")}
          <div className="inline pl-1 text-xs"> + More</div>
        </div>
      ) : (
        <div>
          {format(availabilities[0]?.startTime ?? new Date(), "MMMM d")}
        </div>
      )}
    </>
  );
};

export default ExperienceDate;
