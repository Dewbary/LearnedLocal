import React from "react";

type Props = {
  className?: string;
  title: string;
  onClick: () => void;
};

const PillButton = ({ className, title, onClick }: Props) => {
  return (
    <button
      type="button"
      className={`m-1 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PillButton;
