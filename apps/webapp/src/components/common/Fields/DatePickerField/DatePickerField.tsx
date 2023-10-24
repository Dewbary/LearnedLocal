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
        draft.push({
          startTime: date,
          endTime: date,
        });
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
