import React from "react";
import FormPageHeader from "../Typography/Typography";
import DateAndTimePicker from "../../common/DateAndTimePicker";

const DatePage = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={2}
        title="Select a Date and Time for your experience"
        subtitle="When and how often would you like to host your class?"
      />

      <div className="flex flex-1 flex-col space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <DateAndTimePicker />
        {/* 
        
          We can uncomment this later if we decide to add the "timeline" field back into the web app.
        
          <div className="flex flex-1 flex-col">
          <FormLabel text="Timeline" className="text-gray-600" />
          <Field
            className="textarea-bordered textarea w-full"
            id="timeline"
            name="timeline"
            as="textarea"
            placeholder="Describe in detail the timeline of your experience"
          />
        </div> */}
      </div>
    </div>
  );
};

export default DatePage;
