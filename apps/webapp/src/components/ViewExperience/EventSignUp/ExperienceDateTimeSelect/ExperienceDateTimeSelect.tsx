import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ExperienceAvailability, Registration } from "packages/db";
import * as React from "react";
import { Typography } from "~/components/common/Typography";
import ExperienceDateTimeOption from "./ExperienceDateTimeOption";
import Button from "~/components/common/Button";
import {
  getDay,
  getSpotsLeft,
  getTime,
} from "~/components/common/DateAndTimePicker/DateAndTimeUtils";
import cx from "classnames";
import CustomModal from "~/components/common/CustomModal";
import RequestTimeModal from "./RequestTimeModal";

type Props = {
  availableDates: ExperienceAvailability[] | null;
  selectedAvailability: ExperienceAvailability | undefined;
  setSelectedAvailability: (availability: ExperienceAvailability) => void;
  registrationsCount: Registration[] | undefined;
  availableSpots: number | null;
  experienceIsFull: boolean;
};

const ExperienceDateTimeSelect = ({
  availableDates,
  selectedAvailability,
  setSelectedAvailability,
  registrationsCount,
  availableSpots,
  experienceIsFull,
}: Props) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  return (
    <div className="w-full">
      {selectedAvailability ? (
        <div
          tabIndex={0}
          className="btn-ghost mt-4 flex cursor-pointer flex-row items-center justify-between rounded-2xl border border-ll-slate px-6 py-4"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div className="flex flex-col">
            <div className={Typography.SubTitleUppercase}>Date & Time</div>
            <div className={Typography.BodyText}>
              {getDay(selectedAvailability?.startTime)}
            </div>
            <div className={Typography.BodyText}>
              {getTime(selectedAvailability.startTime)}-
              {getTime(selectedAvailability.endTime)}
            </div>
          </div>
          <ChevronDownIcon color="black" width={24} height={24} />
        </div>
      ) : (
        <div>No available dates</div>
      )}

      <ul
        className={cx({
          "rounded-box absolute mt-3 w-[268px] bg-base-100 p-4": true,
          hidden: !menuOpen,
        })}
      >
        {availableDates?.map((date) => {
          return (
            <ExperienceDateTimeOption
              key={date.id}
              date={date}
              spotsLeft={getSpotsLeft(registrationsCount, date, availableSpots)}
              onClick={() => {
                setSelectedAvailability(date);
                setMenuOpen((prev) => !prev);
              }}
            />
          );
        })}
        <CustomModal
          className="bg-white lg:h-[725px] lg:w-[570px]"
          button={
            <Button
              className="mt-2 w-full rounded-full bg-ll-orange px-6 py-4 text-white"
              text={"Request another date"}
              onClick={() => {}}
            />
          }
        >
          <RequestTimeModal />
        </CustomModal>
      </ul>
    </div>
  );
};

export default ExperienceDateTimeSelect;
