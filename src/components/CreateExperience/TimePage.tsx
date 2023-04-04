import { Field } from "formik";
import React, { useState } from "react";
import { FormLabel, InputField } from "../CreateExperience";
import Calendar from "./Calendar";
import TimeSelect from "./TimeSelect";
// import Calendar from "react-calendar";

const TimePage = () => {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [date, setDate] = useState(new Date());

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (
    newValue: React.SetStateAction<{ startDate: Date; endDate: number }>
  ) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <div>
      <FormLabel text="Start Time" />

      <TimeSelect label="Start Time" />

      <FormLabel text="End Time" />

      <TimeSelect label="End Time" />

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
