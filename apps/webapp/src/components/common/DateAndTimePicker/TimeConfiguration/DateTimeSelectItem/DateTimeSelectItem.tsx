import * as React from "react";
import { format } from "date-fns";
import type { DateInfo } from "~/components/types";
import { Field, useFormikContext } from "formik";
import type { FieldArrayRenderProps, FieldProps, FormikErrors } from "formik";
import TimeSelect from "~/components/common/TimeSelect";
import type { FormValues } from "~/components/CreateExperience/types";
import AmPmPicker from "~/components/common/Fields/AmPmPicker";

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
      <div className="flex flex-col rounded-lg border border-ll-slate bg-ll-grey px-4 py-4 lg:flex-row lg:items-center lg:justify-center">
        <h3 className="pb-2 pr-4 text-lg lg:pb-0">
          {format(dateInfo.startTime, "E, MMMM dd, yyyy")}
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
            />
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
        <Field name="lastName">
          {({ field, form, meta }: FieldProps) => (
            <AmPmPicker
              className="ml-4 h-14 w-12"
              field={field}
              form={form}
              meta={meta}
            />
          )}
        </Field>
      </div>
    </>
  );
};

export default DateTimeSelectItem;
