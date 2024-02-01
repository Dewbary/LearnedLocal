import * as React from "react";
import { Field } from "formik";
import type { Item } from "~/components/types";
import Image from "next/image";
import orangeAsterisk from "../../../../../assets/orange_asterisk.png";
import FieldLabel from "../FieldLabel";

type Props = {
  displayName: string;
  name: string;
  placeholderText: string;
  items: Item[];
  required?: boolean;
  onItemSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const SelectField = ({
  displayName,
  name,
  placeholderText,
  items,
  required,
  onItemSelect,
}: Props) => {
  return (
    <div>
      <FieldLabel displayName={displayName} required={required} />
      <Field
        name={name}
        as="select"
        placeholder={placeholderText}
        onChange={onItemSelect}
        className="mt-2 h-14 w-full rounded-md border border-gray-400 bg-ll-grey p-3 text-sm focus:outline-none"
      >
        {items
          ? items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))
          : null}
      </Field>
    </div>
  );
};

export default SelectField;
