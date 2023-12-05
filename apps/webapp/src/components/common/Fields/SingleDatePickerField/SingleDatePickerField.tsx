import * as React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { FieldProps } from "formik";
import { enUS } from "date-fns/locale";

registerLocale("enUS", enUS);

const SingleDatePickerField = ({ field, form }: FieldProps<Date>) => {
  const { setFieldValue } = form;
  const selectedDate = field.value;

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setFieldValue(field.name, date)}
      inline
      locale="enUS"
      highlightDates={[selectedDate]}
      isClearable
      minDate={startOfDay(new Date())}
      className="border-none"
    />
  );
};

export default SingleDatePickerField;
