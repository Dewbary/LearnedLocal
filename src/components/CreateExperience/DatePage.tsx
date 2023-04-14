import { Field, FieldProps } from "formik";
import React, { useState } from "react";
import { FormLabel, InputField } from "../CreateExperience";
import Calendar from "./Calendar";
import FormPageHeader from "./Typography/Typography";
import TimeSelect from "./TimeSelect";

type Props = {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
};

const DatePage = ({
  selectedDay,
  setSelectedDay,
  selectedMonth,
  setSelectedMonth,
}: Props) => {
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
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-4xl px-4">
        <FormPageHeader
          step={3}
          title="Select a Date and Time for your experience"
          subtitle=""
        />

        <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="w-full max-w-xl flex-grow">
              <Field
                name="date"
                component={({ field, form, meta }: FieldProps) => (
                  <Calendar
                    field={field}
                    form={form}
                    meta={meta}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    currentMonth={selectedMonth}
                    setCurrentMonth={setSelectedMonth}
                  />
                )}
              />
            </div>
            <div className="space-y-8">
              <div>
                <FormLabel text="Start Time" className="text-gray-600" />
                <TimeSelect label="Start Time" name="startTime" />
              </div>
              <div>
                <FormLabel text="End Time" className="text-gray-600" />
                <TimeSelect label="End Time" name="endTime" />
              </div>
            </div>
          </div>
          <div>
            <FormLabel text="Timeline" className="text-gray-600" />
            <Field
              className="textarea-bordered textarea w-full"
              id="timeline"
              name="timeline"
              as="textarea"
              placeholder="Describe in detail the timeline of your experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePage;
