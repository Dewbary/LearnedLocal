import { Field } from "formik";
import React, { useState } from "react";
import { FormLabel, InputField } from "../CreateExperience";
import Calendar from "./Calendar";
import FormPageHeader from "./Typography/Typography";

const DatePage = () => {
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
      <FormPageHeader
        step={3}
        title="Select a date for your experience"
        subtitle=""
      />
      <FormLabel text="Date" />
      <div className="">
        <Field name="date" component={Calendar} />
      </div>
    </div>
  );
};

export default DatePage;
