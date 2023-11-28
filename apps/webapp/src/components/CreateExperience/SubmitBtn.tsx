import classNames from "classnames";
import { useFormikContext } from "formik";
import React from "react";
import { FormValues } from "./types";

type Props = {
  isEditing: boolean;
};

const SubmitBtn = ({ isEditing }: Props) => {
  const { dirty, isSubmitting, initialErrors} = useFormikContext<FormValues>();
  return (
    <div>
      <button
        type="submit"
        className={classNames({
          "btn bg-amber-500 border-amber-500 text-white": true,
          loading: isSubmitting,
        })}
        disabled={!dirty}
      >
        {isEditing ? "Update" : "Submit"}
      </button>
      {initialErrors.availability?.toString()}
    </div>
  );
};

export default SubmitBtn;
