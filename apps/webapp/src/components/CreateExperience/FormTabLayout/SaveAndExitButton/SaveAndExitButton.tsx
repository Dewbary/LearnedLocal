import * as React from "react";
import Button from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";

type Props = {};

const SaveAndExitButton = ({}: Props) => {
  return (
    <Button
      className={`${
        Typography.SmallButtonText ?? ""
      } border border-ll-orange bg-ll-grey px-7 py-4 text-ll-orange`}
      text="Save & Exit"
      onClick={() => {
        console.log("Save & Exit");
      }}
    />
  );
};

export default SaveAndExitButton;
