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
      style={{
        marginLeft: "10px",
        backgroundColor: pinMode ? "green" : "gray",
        color: "white",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {pinMode ? "Remove Pin" : "Drop Pin"}
    </button>
  );
};

export default PinButton;
