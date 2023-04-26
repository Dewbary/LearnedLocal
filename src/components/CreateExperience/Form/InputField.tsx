import { Field } from "formik";

type InputFieldProps = {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
};

export const InputField = ({
  id,
  name,
  type,
  placeholder,
  className,
}: InputFieldProps) => (
  <Field
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    className={`${className} mb-3 rounded-md border-2 border-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none`}
  />
);
