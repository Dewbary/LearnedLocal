import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../../CreateExperience";
import styles from "./DescriptionPage.module.css";
import FormPageHeader from "../Typography/Typography";

const DescriptionPage = () => {
  return (
    <div>
      <FormPageHeader
        step={1}
        title="Let's start with the basics"
        subtitle="We want to understand the big picture of your experience"
      />
      <div className="flex w-full">
        <div className="card grid flex-grow">
          <FormLabel text="Enter your experience title" />
          <InputField
            id="title"
            name="title"
            type="text"
            placeholder="experience title"
          />

          <FormLabel text="Select a theme" />
          <Field
            name="theme"
            as="select"
            className="select-bordered select my-5 w-full max-w-xs"
          >
            <option>Outdoors</option>
            <option>Cooking</option>
            <option>Art</option>
            <option>Tech</option>
            <option>Other</option>
          </Field>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card rounded-box grid flex-grow place-items-center">
          <FormLabel text="Experience Description" />
          <Field
            className="textarea-bordered textarea w-full"
            id="description"
            name="description"
            as="textarea"
            placeholder="Briefly describe what your experience offers"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
