import React from "react";

type Props = {
  tabComponent: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const CreateExperienceFormLayout = ({
  tabComponent,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-1 overflow-y-auto">{tabComponent}</div>
      <div
        className={`mt-6 flex ${
          isFirstStep ? "justify-end" : "justify-between"
        }`}
      >
        <button
          type="button"
          className={`rounded bg-amber-500 px-4 py-2 text-white ${
            isFirstStep ? "hidden" : ""
          }`}
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className={`rounded bg-amber-500 px-4 py-2 text-white ${
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

export default CreateExperienceFormLayout;
