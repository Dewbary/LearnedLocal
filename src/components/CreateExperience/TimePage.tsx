import { Field } from "formik";
import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import { FormProps } from "./types";

const TimePage = () => {
  return (
    <div>
      <div>TimePage</div>
      <FormLabel text="Date" />
      <InputField id="date" name="date" type="text" placeholder="input date" />

      <FormLabel text="StartTime" />
      <InputField
        id="startTime"
        name="startTime"
        type="text"
        placeholder="input start time"
      />

      <FormLabel text="EndTime" />
      <InputField
        id="endTime"
        name="endTime"
        type="text"
        placeholder="input end time"
      />

      <FormLabel text="Timeline" />
      <Field
        className="textarea-bordered textarea w-full"
        id="timeline"
        name="timeline"
        as="textarea"
        placeholder="Describe in detail the timeline of your experience"
      />
    </div>
  );
};

export default TimePage;
