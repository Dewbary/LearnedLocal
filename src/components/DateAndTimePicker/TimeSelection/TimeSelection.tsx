import React from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { ExperienceAvailability } from "~/components/CreateExperience/types";
import TimeSelect from "~/components/common/TimeSelect";

type TimeSelectionProps = {
  dateInfo: ExperienceAvailability | undefined;
  onTimeSelect: (startTime: Date | null, endTime: Date | null) => void;
};

const TimeSelection = ({ dateInfo, onTimeSelect }: TimeSelectionProps) => {
  if (!dateInfo) return null;

  return (
    <div className="mt-2">
      <h3 className="text-md font-bold">
        {format(dateInfo.date, "MMM dd, yyyy")}
      </h3>
      <div className="mt-2 flex space-x-4">
        <TimeSelect
          title="Start Time"
          selectedTime={dateInfo.startTime}
          onChange={(time) => onTimeSelect(time, dateInfo.endTime)}
        />
        <TimeSelect
          title="End Time"
          selectedTime={dateInfo.endTime}
          onChange={(time) => onTimeSelect(dateInfo.startTime, time)}
        />
      </div>
    </div>
  );
};

export default TimeSelection;
