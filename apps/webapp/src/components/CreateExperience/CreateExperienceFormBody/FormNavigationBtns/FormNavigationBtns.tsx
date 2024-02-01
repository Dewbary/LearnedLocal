import * as React from "react";
import Button from "~/components/common/Button";
import SubmitBtn from "../../SubmitBtn";

type Props = {
  onNext: () => void;
  onBack: () => void;
  setDraftState: (state: boolean) => void;
  isEditing?: boolean;
  showSubmit?: boolean;
  hideBack?: boolean;
};

const FormNavigationBtns = ({
  onNext,
  onBack,
  setDraftState,
  isEditing = false,
  showSubmit = false,
  hideBack = false,
}: Props) => {
  return (
    <div className="mx-4 flex max-w-md flex-1 justify-center space-x-4">
      {!hideBack && (
        <Button
          className="max-w-xs flex-1 rounded-full border-2 border-ll-orange bg-white px-6 py-4 text-ll-orange"
          text="Back"
          onClick={onBack}
        />
      )}

      {showSubmit ? (
        <SubmitBtn isEditing={isEditing} setDraftState={setDraftState} />
      ) : (
        <Button
          className="max-w-xs flex-1 rounded-full bg-ll-orange px-6 py-4 text-white"
          text={"Next"}
          onClick={onNext}
        />
      )}
    </div>
  );
};

export default FormNavigationBtns;
