import * as React from "react";
import Button from "~/components/common/Button";

type Props = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

const ConfirmationPage = ({ goToNextPage, goToPrevPage }: Props) => {
  return (
    <div className="">
      <Button text="Back" onClick={goToPrevPage} />
      <Button text="Confirm request" onClick={goToNextPage} />
    </div>
  );
};

export default ConfirmationPage;
