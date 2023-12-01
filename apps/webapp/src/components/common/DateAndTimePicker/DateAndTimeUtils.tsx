import { format } from "date-fns";
import type { DateInfo } from "../../types";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { ExperienceAvailability, Registration } from "packages/db";
import { av } from "vitest/dist/reporters-5f784f42";

const dateDisplayOptions = {
  month: "short",
  day: "2-digit",
} as const;

export const sortByDate = (dates: DateInfo[]) => {
  return [...dates].sort((a, b) => {
    if (!a.startTime || !b.startTime) return 0;
    return a.startTime.getTime() - b.startTime.getTime();
  });
};

export const getTime = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "h:mm a");
};

export const getDay = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "EEE, MMM d");
};

export const getSpotsLeft = (
  registrationsCount: Registration[] | undefined,
  availability: ExperienceAvailability,
  availableSpots: number | null
): number => {
  const numRegistrations = registrationsCount
    ?.filter((registration) => registration.availabilityId === availability.id)
    .reduce(
      (accumulator, registration) => accumulator + registration.partySize,
      0
    );

  if (numRegistrations != undefined && availableSpots != undefined) {
    return availableSpots - numRegistrations;
  }
  return 0;
};

export const getDateToDisplay = (experience: ExperienceInfo): string => {
  if (experience.isFutureExperience) {
    return "Coming Soon";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const availableDates = experience.availability
    ?.map((a) => {
      return a.startTime;
    })
    .filter((a) => {
      return a && a.getTime() > yesterday.getTime();
    });

  if (availableDates) {
    if (availableDates.length > 1) {
      availableDates.sort((dateOne, dateTwo) => {
        const timeOne = dateOne?.getTime() || 0;
        const timeTwo = dateTwo?.getTime() || 0;
        return timeOne - timeTwo;
      });

      return (
        `${
          availableDates
            .at(0)
            ?.toLocaleDateString("en-US", dateDisplayOptions) ?? ""
        } + more` ?? ""
      );
    }
    return (
      availableDates.at(0)?.toLocaleDateString("en-US", dateDisplayOptions) ??
      ""
    );
  }
  return "";
};
