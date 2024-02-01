import React from "react";
import SubmitBtn from "../SubmitBtn";
import FormPageHeader from "../Typography/Typography";
import { ErrorMessage } from "formik";

type Props = {
  isEditing: boolean;
};

const FinalStepsPage = ({ isEditing }: Props) => {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={7}
        title="Review your experience details"
        subtitle="Double check to make sure everything is set correctly"
      />
      {/* <SubmitBtn isEditing={isEditing} /> */}
      <div className="text-red-500 ">
        <ErrorMessage name="title" component="div" />
        <ErrorMessage name="description" component="div" />
        <ErrorMessage name="availability" component="div" />
        <ErrorMessage name="price" component="div" />
      </div>
    </div>
  );
};

export default FinalStepsPage;
