import React from "react";
import { enGB } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("enGB", enGB);

type Props = {
  title: string;
  selectedTime: Date | null;
  onChange: (time: Date | null) => void;
};

const TimeSelect = ({ title, selectedTime, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-sm font-medium">{title}</h4>
      <DatePicker
        selected={selectedTime}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption={title}
        dateFormat="h:mm aa"
        className="w-20 rounded-lg border p-2"
      />
    </div>
  );
};

export default TimeSelect;
