import * as React from "react";
import Button from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import cx from "classnames";
import TimeInput from "~/components/common/TimeInput";

type Props = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

const TimeSelectionPage = ({ goToNextPage, goToPrevPage }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className={cx(Typography.PrimaryTitle, "mb-4")}>
        Request a date & time
      </div>
      <div className={cx(Typography.BodyText, "mb-4 text-center")}>
        If none of these dates work for you, request an additional day and time.
        The host will do their best to accommodate your schedule.
      </div>

      <TimeInput />

      <div className="flex justify-between space-x-8">
        <Button
          className={`${Typography.ButtonText} mt-8 w-48 rounded-full border-2 border-ll-orange bg-white px-6 py-4 text-ll-orange`}
          text="Back"
          onClick={goToPrevPage}
        />
        <Button
          className={`${Typography.ButtonText} mt-8 w-48 rounded-full bg-ll-orange px-6 py-4 text-white`}
          text="Send request"
          onClick={goToNextPage}
        />
      </div>
    </div>
  );
};

export default TimeSelectionPage;
