import { FieldProps } from "formik";
import * as React from "react";
import cx from "classnames";

const AmPmPicker = ({ field, form }: FieldProps<"am" | "pm">) => {
  const { setFieldValue } = form;

  const selected = field.value;

  return (
    <div className="ml-4 h-20 w-14 ">
      <button
        type="button"
        onClick={() => setFieldValue(field.name, "am")}
        className={cx({
          "flex h-1/2 w-full items-center justify-center rounded-t-lg border-2 border-ll-slate":
            true,
          "bg-black text-white": selected === "am",
          "bg-white text-black": selected === "pm",
        })}
      >
        AM
      </button>
      <button
        type="button"
        onClick={() => setFieldValue(field.name, "pm")}
        className={cx({
          "flex h-1/2 w-full items-center justify-center rounded-b-lg border-2 border-t-0 border-ll-slate":
            true,
          "bg-black text-white": selected === "pm",
          "bg-white text-black": selected === "am",
        })}
      >
        PM
      </button>
    </div>
  );
};

export default AmPmPicker;
