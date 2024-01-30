import * as React from "react";
import TimeConfiguration from "./TimeConfiguration";
import { Field } from "formik";
import DatePickerField from "../Fields/DatePickerField";

const DateAndTimePicker = () => {
  return (
    <div className="flex flex-1 flex-col flex-wrap lg:flex-row">
      <div className="card flex flex-1 place-items-center">
        <Field name="availability" component={DatePickerField} />
      </div>
      <div className="m-2" />
      <div className="card flex flex-1 place-items-center">
        <TimeConfiguration />
      </div>
    </div>
  );
};

export default DateAndTimePicker;
