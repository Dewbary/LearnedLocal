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

  if (!dateInfo.date) return null;

  const timeErrors = (errors.availability &&
    errors.availability[dateIndex]) as FormikErrors<DateInfo> | null;

  return (
    <>
      <div className="flex flex-col rounded-lg bg-gray-100 px-4 py-2 lg:flex-row lg:items-center lg:justify-center">
        <h3 className="pr-4 pb-2 text-sm font-bold lg:pb-0">
          {format(dateInfo.date, "MMM dd, yyyy")}
        </h3>

        <div className="flex flex-col">
          <div className="flex">
            <TimeSelect
              title="Start"
              selectedTime={dateInfo.startTime}
              error={!!timeErrors?.startTime}
              onChange={(time) => {
                arrayHelpers.replace(dateIndex, {
                  ...dateInfo,
                  startTime: time,
                });
              }}
            />{" "}
            <div className="self-center px-2">-</div>
            <TimeSelect
              title="End"
              selectedTime={dateInfo.endTime}
              error={!!timeErrors?.endTime}
              onChange={(time) => {
                arrayHelpers.replace(dateIndex, {
                  ...dateInfo,
                  endTime: time,
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
