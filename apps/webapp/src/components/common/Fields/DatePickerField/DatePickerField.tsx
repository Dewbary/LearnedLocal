import { startOfDay } from "date-fns";
import type { FieldProps } from "formik";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import type { DateInfo } from "~/components/types";
import { produce } from "immer";
import { sortByDate } from "../../DateAndTimePicker/DateAndTimeUtils";

registerLocale("enUS", enUS);

const DatePickerField = ({ field, form }: FieldProps<DateInfo[]>) => {
  const { setFieldValue } = form;
  const selectedDates = field.value || [];

  const handleDateSelect = async (date: Date) => {
    const nextSelectedDates = produce(selectedDates, (draft) => {
      const dateIndex = draft.findIndex(
        (dateInfo) =>
          dateInfo?.startTime?.toLocaleDateString() ===
          date.toLocaleDateString()
      );

      if (dateIndex > -1) {
        draft.splice(dateIndex, 1);
      } else {
        const dateToAdd = {
          startTime: new Date(date),
          endTime: new Date(date),
        };

        // Set default start and end times to match the time already configured in the first availablity
        if (
          selectedDates[0] &&
          selectedDates[0].startTime &&
          selectedDates[0].endTime
        ) {
          const startHours = selectedDates[0].startTime.getHours();
          const startMinutes = selectedDates[0].startTime.getMinutes();

          const endHours = selectedDates[0].endTime.getHours();
          const endMinutes = selectedDates[0].endTime.getMinutes();

          dateToAdd.startTime.setHours(startHours, startMinutes);
          dateToAdd.endTime.setHours(endHours, endMinutes);
        }

        draft.push(dateToAdd);
      }
    });

    await setFieldValue(field.name, sortByDate(nextSelectedDates));
  };

  const getHighlightedDates = (): Date[] => {
    return selectedDates.flatMap((dateInfo) =>
      dateInfo.startTime ? [dateInfo.startTime] : []
    );
  };

  return (
    <DatePicker
      selected={null}
      onChange={handleDateSelect}
      inline
      locale="enUS"
      highlightDates={getHighlightedDates()}
      isClearable
      minDate={startOfDay(new Date())}
      className="border-none"
    />
  );
};

export default DatePickerField;
