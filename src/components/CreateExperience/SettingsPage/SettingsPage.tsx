import { ErrorMessage, Field } from "formik";
import React from "react";
import { FormLabel } from "../Form/FormLabel";
import { InputField } from "../Form/InputField";
import FormPageHeader from "../Typography/Typography";

const SettingsPage = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={5}
        title="Let's go through a few more details"
        subtitle="Remember to keep in mind your target audience"
      />
      <div className="rounded-lg bg-white p-8 shadow-md">
        <FormLabel text="Minimum Age" />
        <InputField
          id="minAge"
          name="minAge"
          type="number"
          placeholder="min age"
          min={0}
          validate={(value: number | string) => {
            if ((value as number) < 0) {
              return "Min Age must be 0 or more";
            }
          }}
        />
        <ErrorMessage name="minAge" component="div" className="text-red-500" />

        <FormLabel text="Experience Price" />
        <label className="input-group">
          <Field
            name="price"
            type="number"
            placeholder="0"
            min={0}
            className="input-bordered input mb-5"
            validate={(value: number) => {
              if (value < 0) {
                return "Price must be 0 or more";
              }
            }}
          />
          <span className="mb-5">USD</span>
        </label>
        <ErrorMessage name="price" component="div" className="text-red-500" />

        <FormLabel text="Max Attendees" />
        <InputField
          id="maxAttendees"
          name="maxAttendees"
          type="number"
          placeholder="max number of people that can attend your experience"
          min={1}
          validate={(value: number | string) => {
            if ((value as number) < 0) {
              return "Max Attendees must be 1 or more";
            }
          }}
        />
        <ErrorMessage
          name="maxAttendees"
          component="div"
          className="text-red-500"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
