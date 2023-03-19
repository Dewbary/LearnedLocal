import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const DescriptionPage = () => {
  return (
    <div>
      <div>DescriptionPage</div>

      <FormLabel text="Experience Title" />
      <InputField
        id="title"
        name="title"
        type="text"
        placeholder="experience title"
      />

      <FormLabel text="Experience Theme" />
      <InputField
        id="theme"
        name="theme"
        type="text"
        placeholder="experience theme"
      />

      <FormLabel text="Experience Description" />
      <Field
        className="textarea-bordered textarea w-full"
        id="description"
        name="description"
        as="textarea"
        placeholder="Briefly describe what your experience offers"
      />
    </div>
  );
};

export default DescriptionPage;
