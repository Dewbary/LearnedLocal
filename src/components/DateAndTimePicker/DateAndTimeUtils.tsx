import { isEqual } from "lodash";
import type { ExperienceAvailability } from "../CreateExperience/types";

const getISODateString = (date: Date): string | undefined => {
  return date.toISOString().split("T")[0];
};

export const getSelectedDateIndex = (
  selectedDate: Date,
  dateList: ExperienceAvailability[]
): number => {
  const selectedDateString = getISODateString(selectedDate);

  return dateList.findIndex((expDate) =>
    isEqual(getISODateString(expDate.date), selectedDateString)
  );
};

export const updateDatesList = (
  selectedDate: Date,
  selectedDateIndex: number,
  datesList: ExperienceAvailability[]
): ExperienceAvailability[] => {
  if (selectedDateIndex === -1) {
    return [
      ...datesList,
      { date: selectedDate, startTime: null, endTime: null },
    ];
  }

  return datesList.filter((_, index) => index !== selectedDateIndex);
};

export const getActiveDateIndex = (
  activeDateIndex: number | null,
  selectedDateIndex: number
): number | null => {
  if (!activeDateIndex && selectedDateIndex === -1) {
    return selectedDateIndex;
  } else if (activeDateIndex === selectedDateIndex) {
    return null;
  } else if (activeDateIndex && activeDateIndex > selectedDateIndex) {
    return activeDateIndex - 1;
  }
  return activeDateIndex;
};

export const getUpdatedDatesList = (
  datesList: ExperienceAvailability[],
  activeDateIndex: number | null,
  startTime: Date | null,
  endTime: Date | null
): ExperienceAvailability[] => {
  if (activeDateIndex === null) return datesList;

  let newDatesData = [...datesList];

  newDatesData[activeDateIndex] = {
    ...newDatesData[activeDateIndex],
    startTime,
    endTime,
    date: newDatesData[activeDateIndex]?.date!,
  };

  return newDatesData;
};
