import { startOfDay } from "date-fns";
import type { FieldProps } from "formik";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import type { DateInfo } from "~/components/types";
import { produce } from "immer";
import { sortByDate } from "../../DateAndTimePicker/DateAndTimeUtils";
import { d } from "msw/lib/glossary-de6278a9";

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
          startTime: date,
          endTime: date,
        };

        // Set default start and end times to match the time already configured in the first availablity
        if (
          selectedDates[0] &&
          selectedDates[0].startTime &&
          selectedDates[0].endTime
        ) {
          dateToAdd.startTime.setTime(selectedDates[0].startTime.getTime());
          dateToAdd.endTime.setTime(selectedDates[0].endTime.getTime());
        }

        draft.push(dateToAdd);
      }
    });

    await setFieldValue(field.name, sortByDate(nextSelectedDates));
  };

  return (
    <DatePicker
      selected={null}
      onChange={handleDateSelect}
      inline
      locale="enUS"
      highlightDates={selectedDates.map((dateInfo) => dateInfo.startTime!)}
      isClearable
      minDate={startOfDay(new Date())}
      className="border-none"
    />
  );
};

export default DatePickerField;
