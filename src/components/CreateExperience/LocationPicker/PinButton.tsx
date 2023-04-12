import React from "react";
import { usePinContext } from "./PinContext";

type PinButtonProps = {
  clearPinData: () => void;
};

const PinButton = ({ clearPinData }: PinButtonProps) => {
  const { pinMode, togglePinMode } = usePinContext();

  const handleClick = () => {
    if (pinMode) {
      clearPinData();
    }
    togglePinMode();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`ml-2 rounded-md px-4 py-2 text-white ${
        pinMode ? "bg-green-500" : "bg-gray-500"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      {pinMode ? "Remove Pin" : "Drop Pin"}
    </button>
  );
};

export default PinButton;
