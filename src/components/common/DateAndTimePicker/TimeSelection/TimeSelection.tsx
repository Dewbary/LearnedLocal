import React from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import TimeSelect from "~/components/common/TimeSelect";
import { DateInfo } from "~/components/types";

type TimeSelectionProps = {
  dateInfo: DateInfo | undefined;
  onTimeSelect: (startTime: Date | null, endTime: Date | null) => void;
};

const TimeSelection = ({ dateInfo, onTimeSelect }: TimeSelectionProps) => {
  if (!dateInfo || !dateInfo.date) return null;

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
