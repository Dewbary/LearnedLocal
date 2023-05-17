import { Field } from "formik";

type InputFieldProps = {
  id: string;
  name: string;
  type: string;
  min?: number;
  placeholder?: string;
  className?: string;
  validate?: (value: string | number) => string | number | undefined;
};

export const InputField = ({
  id,
  name,
  type,
  min,
  placeholder,
  className,
  validate,
}: InputFieldProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Field
      id={id}
      name={name}
      type={type}
      min={min}
      placeholder={placeholder}
      className={`${
        className ?? ""
      } mb-3 rounded-md border-2 border-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none`}
      onKeyDown={handleKeyDown}
      validate={(value: number | string) => (validate ? validate(value) : null)}
    />
  );
};
