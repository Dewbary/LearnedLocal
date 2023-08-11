import { Field, FieldProps } from "formik";
import React from "react";
import { FormLabel } from "./Form/FormLabel";
import FormPageHeader from "./Typography/Typography";
import DateAndTimePicker from "../common/DateAndTimePicker";
import { DateInfo } from "../types";

const DatePage = () => {
  return (
    <div className="mx-auto max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={3}
        title="Select a Date and Time for your experience"
        subtitle=""
      />

      <div className="flex-1 flex-col lg:flex-row">
        <div className="card rounded-box grid h-32 flex-grow place-items-center bg-base-300">
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
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card rounded-box grid h-32 flex-grow place-items-center bg-base-300">
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

      {/* <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg">
      </div> */}
    </div>
  );
};

export default DatePage;
