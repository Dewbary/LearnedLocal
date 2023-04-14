import React from "react";
import SubmitBtn from "./SubmitBtn";
import FormPageHeader from "./Typography/Typography";

const FinalStepsPage = () => {
  return (
    <div>
      <FormPageHeader
        step={8}
        title="Review your experience details"
        subtitle="Double check to make sure everything is set correctly"
      />
      <SubmitBtn />
    </div>
  );
};

export default FinalStepsPage;
