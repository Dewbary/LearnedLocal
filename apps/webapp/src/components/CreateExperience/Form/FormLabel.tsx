type FormLabelProps = {
  text: string;
  className?: string;
};

export const FormLabel = ({ text, className }: FormLabelProps) => (
  <>
    <label
      className={`mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 ${className ?? ""}`}
    >
      {text}
    </label>
  </>
);
