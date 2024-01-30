import React from "react";

import DateTimeSelectItem from "./DateTimeSelectItem";
import { FieldArray, useFormikContext } from "formik";
import type { FormValues } from "~/components/CreateExperience/types";
import FieldLabel from "../../Fields/FieldLabel";

const TimeConfiguration = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <div className="flex w-full flex-col overflow-y-scroll ">
      <FieldLabel displayName="Your Selected Times" />
      <div className="mt-2 font-inter text-xs text-gray-400">
        {values.availability.length === 0 && (
          <span>No times yet, select a date to start</span>
        )}
      </div>

      <FieldArray
        name="availability"
        render={(arrayHelpers) => (
          <div className="space-y-2">
            {values.availability.map((dateInfo, index) => {
              if (!dateInfo || !dateInfo.startTime) return null;

              return (
                <DateTimeSelectItem
                  key={dateInfo.startTime.toISOString()}
                  dateIndex={index}
                  dateInfo={dateInfo}
                  arrayHelpers={arrayHelpers}
                />
              );
            })}
          </div>
        )}
      />

      <div className="mt-4 font-inter text-sm text-gray-400">
        To add more slots, select another date
      </div>
    </div>
  );
};

export default TimeConfiguration;
