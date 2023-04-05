import styles from "./Typography.module.css";

type FormPageHeaderProps = {
  step: number;
  title: string;
  subtitle: string;
};

const FormPageHeader = ({ step, title, subtitle }: FormPageHeaderProps) => {
  return (
    <>
      <article className={styles.prose}>
        <p className="text-lg">Step {step}</p>

        <h1 className="my-2 text-3xl font-bold">{title}</h1>
        <p className=" text-sm tracking-wide text-gray-700">{subtitle}</p>
      </article>
      <hr className="my-5" />
    </>
  );
};

export default FormPageHeader;
