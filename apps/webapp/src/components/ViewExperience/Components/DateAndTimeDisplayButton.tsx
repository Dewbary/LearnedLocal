import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ExperienceAvailability } from "packages/db";
import { getDay, getTime } from "~/components/common/DateAndTimePicker/DateAndTimeUtils";

import { Typography } from "~/components/common/Typography";

type Props = {
  enabled?: boolean;
  onClickFunction?: () => void;
  selectedAvailability: ExperienceAvailability | undefined;
}

export default function DateAndTimeDisplayButton({enabled=true, onClickFunction, selectedAvailability} : Props) {
  return (
    <>
      {selectedAvailability ? (
        <div
          tabIndex={0}
          className={`${enabled ? "btn-ghost cursor-pointer" : ""} mt-4 flex flex-row items-center justify-between rounded-2xl border border-ll-slate px-6 py-4`}
          onClick={() => {
            if (enabled && onClickFunction !== undefined) {
              onClickFunction();
            }
          }}
          data-cy={enabled ? "date-sign-up" : "reservation-view"}
        >
          <div className="flex flex-col">
            <div className={Typography.SubTitleUppercase}>Date & Time</div>
            <div className={Typography.BodyText}>
              {getDay(selectedAvailability?.startTime)}
            </div>
            <div className={Typography.BodyText}>
              {getTime(selectedAvailability.startTime)} - {getTime(selectedAvailability.endTime)}
            </div>
          </div>
          <ChevronDownIcon color="black" width={24} height={24} className={`${enabled ? "" : "hidden"}`}/>
        </div>
      ) : (
        <div>No available dates</div>
      )}
    </>
  )
}