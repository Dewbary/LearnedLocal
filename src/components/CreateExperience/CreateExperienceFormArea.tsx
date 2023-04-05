import React from "react";

type Props = {
  tabComponent: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const CreateExperienceFormArea = ({
  tabComponent,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}: Props) => {
  return (
    <div className="">
      {tabComponent}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className={`rounded bg-blue-500 px-4 py-2 text-white ${
            isFirstStep ? "hidden" : ""
          }`}
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className={`rounded bg-blue-500 px-4 py-2 text-white ${
            isLastStep ? "hidden" : ""
          }`}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateExperienceFormArea;
