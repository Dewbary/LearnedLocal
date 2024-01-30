import React from "react";
import { enUS } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";

registerLocale("enUS", enUS);

type Props = {
  title: string;
  selectedTime: Date | null;
  error?: boolean;
  onChange: (time: Date | null) => void;
};

const TimeSelect = ({
  title,
  selectedTime,
  error = false,
  onChange,
}: Props) => {
  return (
    <div>
      <DatePicker
        selected={selectedTime}
        value={selectedTime ? format(selectedTime, "h:mm") : undefined}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption={""}
        placeholderText={title}
        locale="enUS"
        dateFormat="h:mm"
        className={`h-14 w-20 rounded-lg border border-ll-slate bg-ll-grey text-center ${
          error ? "border-red-500" : ""
        } p-2 text-lg`}
      />
    </div>
  );
};

export default TimeSelect;
