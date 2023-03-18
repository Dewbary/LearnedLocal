import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import { FormProps } from "./types";

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

      <FormLabel text="Experience Description" />
      {/* <InputField
            id="description"
            name="description"
            type="text"
            placeholder="experience description"
          /> */}

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
