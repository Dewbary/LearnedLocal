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
import { ExperienceInfo } from "packages/db/types/types";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

type Props = {
  experience: ExperienceInfo;
  selectedAvailability: ExperienceAvailability | undefined;
  setSelectedAvailability: (availability: ExperienceAvailability) => void;
  registrationsCount: Registration[] | undefined;
};

const ExperienceDateTimeSelect = ({
  experience,
  selectedAvailability,
  setSelectedAvailability,
  registrationsCount,
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
              {getTime(selectedAvailability.startTime)} - {getTime(selectedAvailability.endTime)}
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
        {experience.availability?.map((date) => {
          return (
            <ExperienceDateTimeOption
              key={date.id}
              date={date}
              spotsLeft={getSpotsLeft(
                registrationsCount,
                date,
                experience.maxAttendees
              )}
              onClick={() => {
                setSelectedAvailability(date);
                setMenuOpen((prev) => !prev);
              }}
            />
          );
        })}
        <CustomModal
          className="bg-white lg:w-[570px]"
          button={
            <Button
              className="bg-ll-gray mt-2 w-full rounded-full px-6 py-4 text-black"
              text={"Request another date"}
              onClick={() => {
                window.gtag("event", "request_date_click", {
                  experience_title: experience.title,
                });
              }}
            />
          }
        >
          <RequestTimeModal
            experienceTitle={experience.title}
            hostEmail={
              experience.profile?.email ?? "learnedlocal.app@gmail.com"
            }
          />
        </CustomModal>
      </ul>
    </div>
  );
};

export default ExperienceDateTimeSelect;
