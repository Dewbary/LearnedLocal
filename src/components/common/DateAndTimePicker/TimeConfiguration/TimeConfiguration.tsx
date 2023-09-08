import React from "react";

import DateTimeSelectItem from "./DateTimeSelectItem";
import { FieldArray, useFormikContext } from "formik";
import { FormValues } from "~/components/CreateExperience/types";

const TimeConfiguration = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <div className="flex h-64 w-full flex-col overflow-y-scroll ">
      <FieldArray
        name="availability"
        render={(arrayHelpers) => (
          <div className="space-y-2">
            {values.availability.map((dateInfo, index) => {
              if (!dateInfo || !dateInfo.date) return null;

              return (
                <DateTimeSelectItem
                  key={dateInfo.date.toISOString()}
                  dateIndex={index}
                  dateInfo={dateInfo}
                  arrayHelpers={arrayHelpers}
                />
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default TimeConfiguration;
