import { Field } from "formik";
import Image from "next/image";
import orangeAsterisk from "../../../assets/orange_asterisk.png";
import { Typography } from "../common/Typography";

type Props = {
  name: string;
  displayName: string;
  as?: string;
  placeholder?: string;
  type?: string;
  note?: string;
  required?: boolean;
  cyTestData?: string;
  disabled?: boolean;
}

export default function InputField({name, displayName, type, note, placeholder, as, required, cyTestData, disabled} : Props) {
  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex flex-row items-center gap-1">
        <h2 className={Typography.InputLabel}>{displayName}</h2>
        {required && (
          <Image src={orangeAsterisk} alt="a required field" width={15} height={15} className="pb-1"/>
        )}
      </div>
      <Field name={name} type={type || "input"} className={`border w-full p-3 rounded-lg bg-ll-grey text-sm border-gray-400 ${as === "textarea" ? "h-48" : ""} disabled:text-gray-400`} placeholder={placeholder} as={as} data-cy={cyTestData} disabled={disabled}/>
      {note && (
        <div className={Typography.InfoText}>{note}</div>
      )}
    </div>
  )
}