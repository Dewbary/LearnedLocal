import * as React from "react";
import { Typography } from "../Typography";
import cx from "classnames";
import { ErrorMessage, Field } from "formik";
import AmPmPicker from "../Fields/AmPmPicker";

const TimeInput = () => {
  return (
    <div className="flex flex-col">
      <div className={`${Typography.InputLabel} mb-2`}>Start time</div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col">
            <Field
              id="hour"
              name="hour"
              type="number"
              className={cx(
                "h-20 w-20 rounded-lg border-2 border-ll-slate bg-black text-center text-white",
                Typography.NumberText
              )}
              validate={(value: number | string) => {
                if ((value as number) < 1 || (value as number) > 12) {
                  return "Hour must be between 1 and 12";
                }
              }}
              min={1}
              max={12}
            />
          </div>
          <div className="mx-4 self-center text-[24px] text-xl font-[700]">
            :
          </div>
          <div className="flex flex-col">
            <Field
              className={cx(
                "h-20 w-20 rounded-lg border-2 border-ll-slate bg-white text-center",
                Typography.NumberText
              )}
              id="minute"
              name="minute"
              type="number"
              validate={(value: number | string) => {
                if ((value as number) < 0 || (value as number) > 59) {
                  return "Minute must be between 0 and 59";
                }
              }}
              min={0}
              max={59}
            />
          </div>

          <Field id="ampm" name="ampm" component={AmPmPicker} />
        </div>
        <div className={`${Typography.BodyText} mt-2 flex text-ll-slate`}>
          <div className="mr-10 w-20">Hour</div>
          <div className="w-20">Minute</div>
        </div>
        <ErrorMessage name="hour" component="div" className="text-red-500" />
        <ErrorMessage name="minute" component="div" className="text-red-500" />
      </div>
    </div>
  );
};

export default TimeInput;
