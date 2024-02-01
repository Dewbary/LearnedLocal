import * as React from "react";
import Button from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { FormValues } from "../../types";

type Props = {
  setDraftState: (state: boolean) => void;
};

const SaveAndExitButton = ({ setDraftState }: Props) => {
  const { dirty, isSubmitting, initialErrors } = useFormikContext<FormValues>();

  return (
    <Button
      // className={`${
      //   Typography.SmallButtonText ?? ""
      // } border border-ll-orange bg-ll-grey px-7 py-4 text-ll-orange`}
      className={classNames(Typography.SmallButtonText, {
        "border border-ll-orange bg-ll-grey px-7 py-4 text-ll-orange":
          !isSubmitting,
        loading: isSubmitting,
      })}
      text="Save & Exit"
      type="submit"
      onClick={() => {
        setDraftState(true);
      }}
    />
  );
};

export default SaveAndExitButton;
