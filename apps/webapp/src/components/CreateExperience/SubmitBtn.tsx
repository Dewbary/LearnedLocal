import classNames from "classnames";
import { useFormikContext } from "formik";
import React from "react";
import type { FormValues } from "./types";
import Button from "../common/Button";

type Props = {
  isEditing: boolean;
  setDraftState: (state: boolean) => void;
};

const SubmitBtn = ({ isEditing, setDraftState }: Props) => {
  const { dirty, isSubmitting, initialErrors } = useFormikContext<FormValues>();
  return (
    <>
      <Button
        type="submit"
        className={classNames({
          "flex max-w-xs flex-1 rounded-full bg-ll-orange px-6 py-4 text-white":
            !isSubmitting,
          loading: isSubmitting,
        })}
        disabled={!dirty}
        text={isEditing ? "Update" : "Submit"}
        onClick={() => {
          setDraftState(false);
          console.log("clicked");
        }}
      />
      {initialErrors.availability?.toString()}
    </>
  );
};

export default SubmitBtn;
