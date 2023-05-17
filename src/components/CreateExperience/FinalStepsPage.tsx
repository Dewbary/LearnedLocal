import React from "react";
import SubmitBtn from "./SubmitBtn";
import FormPageHeader from "./Typography/Typography";

type Props = {
  isEditing: boolean;
};

const FinalStepsPage = ({ isEditing }: Props) => {
  return (
    <div className="mx-auto h-screen max-w-4xl py-10 px-4">
      <FormPageHeader
        step={8}
        title="Review your experience details"
        subtitle="Double check to make sure everything is set correctly"
      />
      <SubmitBtn isEditing={isEditing} />
    </div>
  );
};

export default FinalStepsPage;
