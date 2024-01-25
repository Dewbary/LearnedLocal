import type { ExperienceAvailability, Registration } from "packages/db";
import * as React from "react";
import ExperienceDateTimeOption from "./ExperienceDateTimeOption";
import Button from "~/components/common/Button";
import { getSpotsLeft } from "~/components/common/DateAndTimePicker/DateAndTimeUtils";
import cx from "classnames";
import CustomModal from "~/components/common/CustomModal";
import RequestTimeModal from "./RequestTimeModal";
import type { ExperienceInfo } from "packages/db/types/types";
import DateAndTimeDisplayButton from "../../Components/DateAndTimeDisplayButton";

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
  registrationsCount
}: Props) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  return (
    <div className="w-full">

      <DateAndTimeDisplayButton
        selectedAvailability={selectedAvailability}
        onClickFunction={() => {setMenuOpen((prev) => !prev)}}
      />

      <ul
        className={cx({
          "rounded-box absolute mt-3 w-[268px] bg-base-100 p-4 z-10": true,
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
