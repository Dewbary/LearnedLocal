import { isEqual } from "lodash";
import { format } from "date-fns";
import { DateInfo } from "../../types";

const getISODateString = (date: Date): string | undefined => {
  return date.toISOString().split("T")[0];
};

export const sortByDate = (dates: DateInfo[]) => {
  return [...dates].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date.getTime() - b.date.getTime();
  });
};

export const getSelectedDateIndex = (
  selectedDate: Date,
  dateList: DateInfo[]
): number => {
  const selectedDateString = getISODateString(selectedDate);

  return dateList.findIndex((expDate) => {
    if (!expDate.date) return false;
    return isEqual(getISODateString(expDate.date), selectedDateString);
  });
};

export const updateDatesList = (
  selectedDate: Date,
  selectedDateIndex: number,
  datesList: DateInfo[]
): DateInfo[] => {
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
  return null;
};

export const getUpdatedDatesList = (
  datesList: DateInfo[],
  activeDateIndex: number | null,
  startTime: Date | null,
  endTime: Date | null
): DateInfo[] => {
  if (activeDateIndex === null) return datesList;

  const newDatesData = [...datesList];

  newDatesData[activeDateIndex] = {
    ...newDatesData[activeDateIndex],
    startTime,
    endTime,
    date: newDatesData[activeDateIndex]?.date ?? null,
  };

  return newDatesData;
};

export const getTime = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "hh:mm a");
};
