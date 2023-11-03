import * as React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  text: string;
};

const ExpFilterBtn = ({ text }: Props) => {
  return (
    <div className="inline-flex content-center items-center rounded-3xl border border-ll-black px-4 py-2 text-sm">
      {text}
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </div>
  );
};

export default ExpFilterBtn;
