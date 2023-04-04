import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const SettingsPage = () => {
  return (
    <div>
      <FormLabel text="Minimum Age" />
      <InputField
        id="minAge"
        name="minAge"
        type="number"
        placeholder="min age"
      />

      <FormLabel text="Experience Price" />
      <label className="input-group">
        <Field
          name="price"
          type="number"
          placeholder="0"
          className="input-bordered input mb-5"
        />
        <span className="mb-5">USD</span>
      </label>

      <FormLabel text="Max Attendees" />
      <InputField
        id="maxAttendees"
        name="maxAttendees"
        type="number"
        placeholder="max number of people that can attend your experience"
      />
    </div>
  );
};

export default SettingsPage;
