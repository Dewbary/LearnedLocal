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
      <FormLabel text="Date" />
      {/* <InputField id="date" name="date" type="text" placeholder="input date" /> */}

      {/* <DatePicker label="basic date picker" /> */}
      {/* <Calendar onChange={setDate} value={date} /> */}
      <Calendar />

      <FormLabel text="Start Time" />
      {/* <InputField
        id="startTime"
        name="startTime"
        type="text"
        placeholder="input start time"
      /> */}

      <TimeSelect label="Start Time" />

      <FormLabel text="End Time" />
      {/* <InputField
        id="endTime"
        name="endTime"
        type="text"
        placeholder="input end time"
      /> */}
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
