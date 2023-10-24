import * as React from "react";
import { format } from "date-fns";
import type { DateInfo } from "~/components/types";
import { FormikErrors, useFormikContext } from "formik";
import type { FieldArrayRenderProps } from "formik";
import TimeSelect from "~/components/common/TimeSelect";
import type { FormValues } from "~/components/CreateExperience/types";

type Props = {
  dateIndex: number;
  dateInfo: DateInfo;
  arrayHelpers: FieldArrayRenderProps;
};

const DateTimeSelectItem = ({ dateIndex, dateInfo, arrayHelpers }: Props) => {
  const { errors } = useFormikContext<FormValues>();

  if (!dateInfo.startTime) return null;

  const timeErrors = (errors.availability &&
    errors.availability[dateIndex]) as FormikErrors<DateInfo> | null;

  return (
    <>
      <div className="flex flex-col rounded-lg bg-gray-100 px-4 py-2 lg:flex-row lg:items-center lg:justify-center">
        <h3 className="pb-2 pr-4 text-sm font-bold lg:pb-0">
          {format(dateInfo.startTime, "MMM dd, yyyy")}
        </h3>

        <div className="flex flex-col">
          <div className="flex">
            <TimeSelect
              title="Start"
              selectedTime={dateInfo.startTime}
              error={!!timeErrors?.startTime}
              onChange={(time) => {
                if (!time || !dateInfo.startTime) return;
                const updatedStartTime = new Date(
                  dateInfo.startTime?.getTime()
                );
                updatedStartTime.setTime(time.getTime());

                arrayHelpers.replace(dateIndex, {
                  ...dateInfo,
                  startTime: updatedStartTime,
                });
              }}
            />{" "}
            <div className="self-center px-2">-</div>
            <TimeSelect
              title="End"
              selectedTime={dateInfo.endTime}
              error={!!timeErrors?.endTime}
              onChange={(time) => {
                if (!time || !dateInfo.endTime) return;
                const updatedEndTime = new Date(dateInfo.endTime?.getTime());
                updatedEndTime.setTime(time.getTime());

                arrayHelpers.replace(dateIndex, {
                  ...dateInfo,
                  endTime: updatedEndTime,
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateTimeSelectItem;
