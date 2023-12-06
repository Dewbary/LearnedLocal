import * as React from "react";
import Button from "~/components/common/Button";
import cx from "classnames";
import { Typography } from "~/components/common/Typography";
import { useFormikContext } from "formik";
import { TimeRequest } from "~/components/types";
import {
  getDayAndYear,
  getHours,
  getTime,
} from "~/components/common/DateAndTimePicker/DateAndTimeUtils";

type Props = {
  goToPrevPage: () => void;
};

const ConfirmationPage = ({ goToPrevPage }: Props) => {
  const { values } = useFormikContext<TimeRequest>();

  const selectedDateTime = new Date(values.date);

  selectedDateTime.setHours(getHours(values.hour, values.ampm));
  selectedDateTime.setMinutes(values.minute);

  return (
    <div className="mx-12 flex flex-1 flex-col justify-center">
      <div className={cx(Typography.ModalTitle, "mb-8 self-center")}>
        Confirm date & time
      </div>
      <div>
        <div className={Typography.LabelUppercase}>Date & Time</div>
        <div className={Typography.InfoText}>{getDayAndYear(values.date)}</div>
        <div className={Typography.InfoText}>{getTime(selectedDateTime)}</div>
      </div>

      <div className="flex justify-between space-x-8">
        <Button
          className="mt-8 w-48 rounded-full border-2 border-ll-orange bg-white px-6 py-4 text-ll-orange"
          text="Back"
          onClick={goToPrevPage}
        />
        <button
          className="mt-8 w-48 rounded-full bg-ll-orange px-6 py-4 text-white"
          type="submit"
        >
          Confirm request
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
