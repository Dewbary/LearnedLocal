import * as React from "react";
import Button from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import cx from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import { startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  goToNextPage: () => void;
};

const DateSelectionPage = ({ goToNextPage }: Props) => {
  return (
    <div className="mx-12 flex flex-1 flex-col items-center justify-center">
      <div className={cx(Typography.ModalTitle, "mb-4")}>
        Request a date & time
      </div>
      <div className={cx(Typography.BodyText, "mb-4 text-center")}>
        If none of these dates work for you, request an additional day and time.
        The host will do their best to accommodate your schedule.
      </div>

      <DatePicker
        selected={null}
        onChange={() => {}}
        inline
        locale="enUS"
        highlightDates={[]}
        isClearable
        minDate={startOfDay(new Date())}
        className="border-none"
      />

      <Button
        className="mt-8 w-80 rounded-full bg-ll-orange px-6 py-4 text-white"
        text="Next"
        onClick={goToNextPage}
      />
    </div>
  );
};

export default DateSelectionPage;
