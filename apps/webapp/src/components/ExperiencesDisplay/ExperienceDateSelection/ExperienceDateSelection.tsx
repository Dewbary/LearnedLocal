import { ExperienceAvailability, Registration } from "@learnedlocal/db";
import React from "react";
import { getTime } from "~/components/common/DateAndTimePicker/DateAndTimeUtils";

type Props = {
  availableDates: ExperienceAvailability[] | null;
  registrationsCount: Registration[] | undefined;
  availableSpots: number | null;
  onSignUp: (availabilityId: number | null) => void;
  experienceIsFull: boolean;
};

const ExperienceDateSelection = ({
  availableDates,
  registrationsCount,
  availableSpots,
  onSignUp,
  experienceIsFull,
}: Props) => {
  return (
    <div className="font-inter">
      <div className="divider"></div>
      {availableDates?.length === 0 || experienceIsFull ? (
        <div>There are currently no availabilities for this experience.</div>
      ) : (
        <>
          {availableDates?.map((date) => (
            <>
              <div className="flex justify-between items-center" key={date.id}>
                <div>
                  <div key={date.id} className="font-semibold">{date.startTime?.toDateString()}</div>
                  <div className="prose text-xs uppercase font-light">
                    {getTime(date.startTime)} - {getTime(date.endTime)}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="bg-ll-yellow py-1 px-5 rounded-full mb-2 text-sm"
                    onClick={() => onSignUp(date.id)}
                  >
                    Sign Up
                  </button>
                  <div className="prose text-xs uppercase font-light">
                    {registrationsCount
                      ?.filter(
                        (registration) =>
                          registration.availabilityId === date.id
                      )
                      .reduce(
                        (accumulator, registration) =>
                          accumulator + registration.partySize,
                        0
                      )}
                    /{availableSpots} Spots Filled
                  </div>
                </div>
              </div>
              <div className="divider"></div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default ExperienceDateSelection;
