import type { ExperienceAvailability } from "packages/db";
import * as React from "react";
import {
  getDay,
  getTime,
} from "~/components/common/DateAndTimePicker/DateAndTimeUtils";
import { Typography } from "~/components/common/Typography";

type Props = {
  date: ExperienceAvailability;
  spotsLeft: number;
  onClick: () => void;
};

const ExperienceDateTimeOption = ({ date, spotsLeft, onClick }: Props) => {
  const filled = spotsLeft === 0;

  return (
    <button
      className={`${
        filled ? "disabled" : ""
      } flex w-full items-center justify-between rounded-lg px-2 py-2 hover:bg-ll-grey`}
      onClick={onClick}
      data-cy={`date-option:${getDay(date.startTime)}`}
    >
      <div className="flex flex-col items-start">
        <div
          className={filled ? Typography.LightSubText : Typography.LabelText}
        >
          {getDay(date.startTime)}
        </div>
        <div className={filled ? Typography.LightSubText : Typography.BodyText}>
          {getTime(date.startTime)}-{getTime(date.endTime)}
        </div>
      </div>
      {filled ? (
        <div className={Typography.LightSubText}>Filled</div>
      ) : (
        <div className={Typography.LightSubText}>{spotsLeft} spots left</div>
      )}
    </button>
  );
};

export default ExperienceDateTimeOption;
