import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import TimeConfiguration from "./TimeConfiguration";
import {
  getActiveDateIndex,
  getSelectedDateIndex,
  updateDatesList,
} from "./DateAndTimeUtils";
import { DateInfo } from "../../types";

registerLocale("enGB", enGB);

type Props = {
  datesList: DateInfo[];
  setDatesList: (value: DateInfo[]) => void;
};

const DateAndTimePicker = ({ datesList, setDatesList }: Props) => {
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);

  const handleDateSelect = (selectedDate: Date | null) => {
    if (!selectedDate) return;

    const selectedDateIndex = getSelectedDateIndex(selectedDate, datesList);
    const updatedDatesList = updateDatesList(
      selectedDate,
      selectedDateIndex,
      datesList
    );
    setDatesList(updatedDatesList);

    const updatedActiveDateIndex = getActiveDateIndex(
      activeDateIndex,
      selectedDateIndex
    );
    setActiveDateIndex(updatedActiveDateIndex);
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="card flex place-items-center p-4 shadow-lg">
        <DatePicker
          onChange={handleDateSelect}
          inline
          locale="enGB"
          highlightDates={datesList
            .filter((data) => data.date)
            .map((data) => data.date!)}
          minDate={startOfDay(new Date())}
          className="border-none"
        />
      </div>
      <div className="m-2" />
      <div className="card flex flex-1 place-items-center p-4 shadow-lg">
        <TimeConfiguration
          datesList={datesList}
          activeDateIndex={activeDateIndex}
          setActiveDateIndex={setActiveDateIndex}
          setDatesList={setDatesList}
        />
      </div>
    </div>
  );
};

export default DateAndTimePicker;
