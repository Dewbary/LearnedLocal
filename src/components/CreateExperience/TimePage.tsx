import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import { FormProps } from "./types";

const TimePage = () => {
  return (
    <div>
      <div>TimePage</div>
      <FormLabel text="Date" />
      <InputField id="date" name="date" type="text" placeholder="input date" />

      <FormLabel text="Time" />
      <InputField id="time" name="time" type="text" placeholder="input time" />
    </div>
  );
};

export default TimePage;
