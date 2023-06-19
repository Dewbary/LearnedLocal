import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import TimeSelection from "./TimeSelection";
import { format, startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("enGB", enGB);

export interface DateData {
  date: Date;
  startTime: Date | null;
  endTime: Date | null;
}

const DateAndTimePicker: React.FC = () => {
  const [datesData, setDatesData] = useState<DateData[]>([]);
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateIndex = datesData.findIndex(
        (dateData) =>
          dateData.date.getDate() === date.getDate() &&
          dateData.date.getMonth() === date.getMonth() &&
          dateData.date.getFullYear() === date.getFullYear()
      );

      let newDatesArray: DateData[];
      if (dateIndex === -1) {
        newDatesArray = [
          ...datesData,
          { date, startTime: null, endTime: null },
        ];
      } else {
        newDatesArray = datesData.filter((_, index) => index !== dateIndex);
        if (activeDateIndex === dateIndex) {
          setActiveDateIndex(null);
        } else if (activeDateIndex! > dateIndex) {
          setActiveDateIndex(activeDateIndex! - 1);
        }
      }

      setDatesData(newDatesArray);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <h1 className="mb-2 w-1/2 text-lg font-bold">Select Dates</h1>
        <h1 className="mb-2 w-1/2 text-lg font-bold">Select Times</h1>
      </div>
      <div className="flex overflow-hidden rounded-lg shadow-lg">
        <div className="w-1/2 bg-white py-4">
          <DatePicker
            selected={
              activeDateIndex !== null ? datesData[activeDateIndex]?.date : null
            }
            onChange={handleDateChange}
            inline
            locale="enGB"
            highlightDates={datesData.map((data) => data.date)}
            minDate={startOfDay(new Date())}
            className="border-none"
          />
        </div>
        <div className="w-1/2 bg-gray-100 p-4">
          {[...datesData]
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((dateData, index) => (
              <button
                key={index}
                type="button"
                className={`m-1 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${
                  activeDateIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => setActiveDateIndex(index)}
              >
                {format(dateData.date, "MMM dd, yyyy")}
              </button>
            ))}
          {activeDateIndex !== null && (
            <TimeSelection
              dateData={datesData[activeDateIndex]}
              onTimeChange={(startTime, endTime) => {
                let newDatesData = [...datesData];
                newDatesData[activeDateIndex] = {
                  ...newDatesData[activeDateIndex],
                  startTime,
                  endTime,
                  date: newDatesData[activeDateIndex]?.date!,
                };
                setDatesData(newDatesData);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DateAndTimePicker;
