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
    <div className="flex w-full flex-col">
      <div className="max-h-screen flex-grow overflow-y-auto">
        {tabComponent}
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
    </div>
  );
};

export default CreateExperienceFormArea;
