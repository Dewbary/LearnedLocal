import { Field, FieldArray } from "formik";

type Props = {
  title: string;
  description: string;
  arrayName: string;
  arrayObject: string[];
  placeHolderText: string;
}

export default function StringArrayInputField ({ title, description, arrayName, arrayObject, placeHolderText}: Props) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="font-bold">
        {title}
      </h2>
      <h3 className="text-sm">
        {description}
      </h3>
      <FieldArray name={arrayName}>
        {({ remove, push }) => (
          <div className="flex flex-col gap-3 items-start w-full">
            {arrayObject.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 items-center w-full">
                <Field name={`${arrayName}.${index}`} placeholder={placeHolderText} className="w-full rounded-md border-2 border-gray-200 py-2 px-4 text-gray-700 focus:border-blue-500 focus:outline-none"/>
                <button onClick={() => remove(index)} className="bg-red-400 w-8 h-8 shadow-md rounded-md text-white hover:bg-red-300 transition-colors" type="button">&#10005;</button>
              </div>
            ))}
            <button onClick={() => push("")} className="bg-blue-400 h-8 px-3 shadow-md rounded-md text-white text-sm hover:bg-blue-300 transition-colors" type="button">Add a note</button>
            </div>
        )}
      </FieldArray>
    </div>
  )
}