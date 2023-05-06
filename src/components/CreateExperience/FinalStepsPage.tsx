import React from "react";
import SubmitBtn from "./SubmitBtn";
import FormPageHeader from "./Typography/Typography";

type Props = {
  isEditing: boolean;
};

const FinalStepsPage = ({ isEditing }: Props) => {
  return (
    <div className="container mx-auto overflow-y-auto py-12 px-4 sm:px-6 lg:px-8">
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
