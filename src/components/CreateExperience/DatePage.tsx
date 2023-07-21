import { Field, FieldProps } from "formik";
import React from "react";
import { FormLabel } from "./Form/FormLabel";
import FormPageHeader from "./Typography/Typography";
import DateAndTimePicker from "../DateAndTimePicker";
import { DateInfo } from "../types";

const DatePage = () => {
  return (
    <div className="mx-auto max-w-4xl py-10 px-4">
      <FormPageHeader
        step={3}
        title="Select a Date and Time for your experience"
        subtitle=""
      />

      <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <Field name="availability">
          {({ field, form }: FieldProps<DateInfo[]>) => (
            <DateAndTimePicker
              datesList={field.value}
              setDatesList={(datesList: DateInfo[]) => {
                form.setFieldValue("availability", datesList);
              }}
            />
          )}
        </Field>
        <div>
          <FormLabel text="Timeline" className="text-gray-600" />
          <Field
            className="textarea-bordered textarea w-full"
            id="timeline"
            name="timeline"
            as="textarea"
            placeholder="Describe in detail the timeline of your experience"
          />
        </div>
      </div>
    </div>
  );
};

export default DatePage;
