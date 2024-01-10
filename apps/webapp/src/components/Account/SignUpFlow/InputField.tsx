import { Field } from "formik";
import Image from "next/image";
import orangeAsterisk from "../../../../assets/orange_asterisk.png";

type Props = {
  name: string;
  displayName: string;
  as?: string;
  placeholder?: string;
  type?: string;
  note?: string;
  required?: boolean;
  cyTestData?: string;
}

export default function InputField({name, displayName, type, note, placeholder, as, required, cyTestData} : Props) {
  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-sm font-raleway font-semibold">{displayName}</h2>
        {required && (
          <Image src={orangeAsterisk} alt="a required field" width={15} height={15} className="pb-1"/>
        )}
      </div>
      <Field name={name} type={type || "input"} className={`border w-full p-3 rounded-lg bg-ll-grey text-sm border-gray-400 ${as === "textarea" ? "h-48" : ""}`} placeholder={placeholder} as={as} data-cy={cyTestData}/>
      {note && (
        <div className="font-inter text-gray-400 text-xs -mt-1">{note}</div>
      )}
    </div>
  )
}