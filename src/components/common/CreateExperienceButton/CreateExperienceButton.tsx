import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

type Props = {
  className?: string;
};

const CreateExperienceButton = ({ className }: Props) => {
  const uniqueSlug = uuidv4();

  return (
    <Link
      className={`${className} btn-primary btn`}
      href={`experience/create/${uniqueSlug}`}
    >
      Create an Experience
    </Link>
  );
};

export default CreateExperienceButton;
