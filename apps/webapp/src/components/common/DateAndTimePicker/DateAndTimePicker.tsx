import * as React from "react";
import TimeConfiguration from "./TimeConfiguration";
import { Field } from "formik";
import DatePickerField from "../Fields/DatePickerField";

const DateAndTimePicker = () => {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="card flex place-items-center p-4 shadow-lg">
        <Field name="availability" component={DatePickerField} />
      </div>
      <div className="m-2" />
      <div className="card flex flex-1 place-items-center p-4 shadow-lg">
        <TimeConfiguration />
      </div>
    </div>
  );
};

export default DateAndTimePicker;
