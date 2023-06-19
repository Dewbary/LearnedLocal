import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DateData } from "../DateAndTimePicker";

registerLocale("enGB", enGB);

interface TimeSelectionProps {
  dateData: DateData | undefined;
  onTimeChange: (startTime: Date | null, endTime: Date | null) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  dateData,
  onTimeChange,
}) => {
  if (!dateData) {
    return null;
  }

  return (
    <div className="mt-2">
      <h3 className="text-md font-bold">
        {format(dateData.date, "MMM dd, yyyy")}
      </h3>
      <div className="mt-2 flex space-x-4">
        <div>
          <h4 className="text-sm font-medium">Start Time</h4>
          <DatePicker
            selected={dateData.startTime}
            onChange={(time) => onTimeChange(time, dateData.endTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Start Time"
            dateFormat="h:mm aa"
            className="w-20 rounded-lg border p-2"
          />
        </div>
        <div>
          <h4 className="text-sm font-medium">End Time</h4>
          <DatePicker
            selected={dateData.endTime}
            onChange={(time) => onTimeChange(dateData.startTime, time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="End Time"
            dateFormat="h:mm aa"
            className="w-20 rounded-lg border p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeSelection;
