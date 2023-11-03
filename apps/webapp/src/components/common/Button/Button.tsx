import * as React from "react";

type Props = {
  className?: string;
  text: string;
  onClick: () => void;
};

const Button = ({ className, text, onClick }: Props) => {
  return (
    <button
      className={`${
        className ?? ""
      } flex items-center justify-center rounded-full px-6 py-4 font-inter duration-300 ease-in-out hover:scale-105 hover:opacity-50`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
