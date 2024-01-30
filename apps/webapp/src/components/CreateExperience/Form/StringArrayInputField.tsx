import { Field, FieldArray } from "formik";
import { FormLabel } from "./FormLabel";
import FieldLabel from "~/components/common/Fields/FieldLabel";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Plus } from "react-feather";

type Props = {
  title: string;
  arrayName: string;
  arrayObject: string[];
  placeHolderText: string;
  required?: boolean;
  note?: string;
};

export default function StringArrayInputField({
  title,
  arrayName,
  arrayObject,
  placeHolderText,
  required,
  note,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleAddInput = (push: (obj: string) => void) => {
    push(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <FieldLabel displayName={title} required={required} />
      <FieldArray name={arrayName}>
        {({ remove, push }) => (
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex w-full flex-row items-center gap-2 rounded-md border-2 border-gray-200 px-4 py-2 ">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeHolderText}
                className="w-full bg-ll-grey text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <button onClick={() => handleAddInput(push)} type="button">
                <PlusIcon
                  className="rounded-full bg-ll-black p-1"
                  color="white"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {note && (
              <div className="-mt-1 font-inter text-xs text-gray-400">
                {note}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {arrayObject.map((item, index) => (
                <div
                  key={index}
                  className="flex rounded-md bg-ll-black py-2 pl-2 pr-4 text-white"
                >
                  <button
                    onClick={() => remove(index)}
                    className="mr-2 h-6 w-6 rounded-md text-white shadow-md transition-colors hover:bg-red-300"
                    type="button"
                  >
                    &#10005;
                  </button>
                  <div className="font-inter ">{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
}
