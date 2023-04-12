import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const DescriptionPage = () => {
  return (
    <div>
      <FormLabel text="Experience Title" />
      <InputField
        id="title"
        name="title"
        type="text"
        placeholder="experience title"
      />

      <FormLabel text="Experience Theme" />
      <select className="select-bordered select my-5 w-full max-w-xs">
        <option>Outdoors</option>
        <option>Cooking</option>
        <option>Art</option>
        <option>Tech</option>
        <option>Other</option>
      </select>

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
