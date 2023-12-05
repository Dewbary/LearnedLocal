import * as React from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Counter = ({ count, setCount }: Props) => {
  return (
    <div className="flex">
      <button onClick={() => setCount((prev) => prev - 1)}>
        <MinusCircleIcon className="text-ll-dark-grey" width={26} height={26} />
      </button>
      <div className="px-2">{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        <PlusCircleIcon className="text-ll-dark-grey" width={26} height={26} />
      </button>
    </div>
  );
};

export default Counter;
