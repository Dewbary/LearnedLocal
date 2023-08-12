import React from "react";

import TimeSelection from "../TimeSelection";
import { format } from "date-fns";
import PillButton from "~/components/common/PillButton";
import { getUpdatedDatesList } from "../DateAndTimeUtils";
import { DateInfo } from "~/components/types";

type Props = {
  datesList: DateInfo[];
  activeDateIndex: number | null;
  setActiveDateIndex: (index: number | null) => void;
  setDatesList: (datesList: DateInfo[]) => void;
};

const TimeConfiguration = ({
  datesList,
  activeDateIndex,
  setActiveDateIndex,
  setDatesList,
}: Props) => {
  if (!datesList) return null;

  const sortedDatesList = datesList.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date.getTime() - b.date.getTime();
  });

  const handleTimeSelect = (startTime: Date | null, endTime: Date | null) => {
    const updatedDatesList = getUpdatedDatesList(
      datesList,
      activeDateIndex,
      startTime,
      endTime
    );
    setDatesList(updatedDatesList);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {sortedDatesList.map(({ date }, index) => {
          if (!date) return null;
          return (
            <PillButton
              key={date.toISOString()}
              className={`${
                activeDateIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
              title={format(date, "MMM dd, yyyy")}
              onClick={() => setActiveDateIndex(index)}
            />
          );
        })}
      </div>
      {activeDateIndex !== null && (
        <TimeSelection
          dateInfo={datesList[activeDateIndex]}
          onTimeSelect={handleTimeSelect}
        />
      )}
    </div>
  );
};

export default TimeConfiguration;
