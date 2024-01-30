import React from "react";
import { Field } from "formik";
import { Typography } from "../common/Typography";
import FieldLabel from "../common/Fields/FieldLabel";

type Props = {
  name: string;
  displayName: string;
  as?: string;
  placeholder?: string;
  type?: string;
  note?: string;
  required?: boolean;
  min?: number;
  max?: number;
  charLimit?: number;
  cyTestData?: string;
  disabled?: boolean;
};

export default function InputField({
  name,
  displayName,
  type,
  note,
  placeholder,
  as,
  required,
  min,
  max,
  cyTestData,
  disabled,
}: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <FieldLabel displayName={displayName} required={required} />
      <Field
        name={name}
        type={type || "input"}
        className={`w-full rounded-md border border-gray-400 bg-ll-grey p-3 text-sm ${
          as === "textarea" ? "h-48" : ""
        } disabled:text-gray-400`}
        placeholder={placeholder}
        as={as}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
        data-cy={cyTestData}
        disabled={disabled}
      />
      {note && <div className={Typography.InfoText}>{note}</div>}
    </div>
  );
}
