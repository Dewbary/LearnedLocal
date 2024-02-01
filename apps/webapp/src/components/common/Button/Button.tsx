import * as React from "react";
import { Typography } from "../Typography";

type Props = {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  className,
  type = "button",
  text,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      className={`${
        className ?? ""
      } ${Typography.ButtonText} flex items-center justify-center rounded-full px-6 py-4 duration-300 ease-in-out hover:scale-105 hover:opacity-50`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
