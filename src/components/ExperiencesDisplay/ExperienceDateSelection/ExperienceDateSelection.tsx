import { ExperienceAvailability, Registration } from "@prisma/client";
import React from "react";
import { getTime } from "~/components/common/DateAndTimePicker/DateAndTimeUtils";

type Props = {
  availableDates: ExperienceAvailability[] | null;
  registrationsCount: Registration[] | undefined;
  availableSpots: number | null;
  onSignUp: (availabilityId: number | null) => void;
};

const ExperienceDateSelection = ({
  availableDates,
  registrationsCount,
  availableSpots,
  onSignUp,
}: Props) => {
  return (
    <div>
      <div className="divider"></div>
      {availableDates?.map((date) => (
        <>
          <div className="flex justify-between">
            <div>
              <div key={date.id}>{date.date?.toDateString()}</div>
              <div className="prose text-xs uppercase">
                {getTime(date.startTime)} - {getTime(date.endTime)}
              </div>
            </div>
            <div>
              <button
                className="btn-primary btn-sm btn mb-2"
                onClick={() => onSignUp(date.id)}
              >
                Sign Up
              </button>
              <div className="prose text-xs uppercase">
                { 
                  registrationsCount?.filter(
                    (registration) => registration.availabilityId === date.id
                  ).reduce(
                    (accumulator, registration) => accumulator + registration.partySize, 0
                  )
                }
                {/* {
                  registrationsCount?.filter(
                    (registration) => registration.availabilityId === date.id
                  ).length
                } */}
                /{availableSpots} Spots Filled
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </>
      ))}
    </div>
  );
};

export default ExperienceDateSelection;
