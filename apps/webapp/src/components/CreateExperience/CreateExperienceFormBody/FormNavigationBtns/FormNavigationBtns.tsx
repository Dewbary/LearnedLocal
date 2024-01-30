import * as React from "react";
import Button from "~/components/common/Button";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const FormNavigationBtns = ({ onNext, onBack }: Props) => {
  return (
    <div className="flex space-x-2">
      <Button
        className="w-48 rounded-full border-2 border-ll-orange bg-white px-6 py-4 text-ll-orange"
        text="Back"
        onClick={onBack}
      />
      <Button
        className="w-48 rounded-full bg-ll-orange px-6 py-4 text-white"
        text="Next"
        onClick={onNext}
      />
    </div>
  );
};

export default FormNavigationBtns;
