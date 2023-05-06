import { Field } from "formik";
import React, { useState } from "react";
import { FormLabel } from "./Form/FormLabel";
import TimeSelect from "./TimeSelect";
import FormPageHeader from "./Typography/Typography";
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
    setValue(newValue);
  };
  return (
    <div className="">
      <FormPageHeader
        step={4}
        title="Choose a time for your experience"
        subtitle=""
      />
      <FormLabel text="Start Time" />
      <TimeSelect label="Start Time" name="startTime" />

      <FormLabel text="End Time" />
      <TimeSelect label="End Time" name="endTime" />

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
