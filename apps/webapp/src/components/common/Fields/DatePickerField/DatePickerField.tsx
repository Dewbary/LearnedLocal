import { startOfDay } from "date-fns";
import type { FieldProps } from "formik";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import type { DateInfo } from "~/components/types";
import { produce } from "immer";
import { sortByDate } from "../../DateAndTimePicker/DateAndTimeUtils";

registerLocale("enGB", enGB);

const DatePickerField = ({ field, form }: FieldProps<DateInfo[]>) => {
  const { setFieldValue } = form;
  const selectedDates = field.value || [];

  const handleDateSelect = (date: Date) => {
    const nextSelectedDates = produce(selectedDates, (draft) => {
      const dateIndex = draft.findIndex(
        (dateInfo) => dateInfo?.date?.toISOString() === date.toISOString()
      );

      if (dateIndex > -1) {
        draft.splice(dateIndex, 1);
      } else {
        draft.push({
          date,
          startTime: null,
          endTime: null,
        });
      }
    });

    setFieldValue(field.name, sortByDate(nextSelectedDates));
  };

  return (
    <DatePicker
      selected={null}
      onChange={handleDateSelect}
      inline
      locale="enGB"
      highlightDates={selectedDates.map((dateInfo) => dateInfo.date!)}
      isClearable
      minDate={startOfDay(new Date())}
      className="border-none"
    />
  );
};

export default DatePickerField;
