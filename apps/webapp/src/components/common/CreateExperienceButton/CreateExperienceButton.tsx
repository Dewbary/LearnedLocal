import * as React from "react";
import Link from "next/link";
import { getUniqueSlug } from "./CreateExperienceUtils";

type Props = {
  className?: string;
};

const CreateExperienceButton = ({ className }: Props) => {
  const [slug, setSlug] = React.useState("");

  React.useEffect(() => {
    setSlug(getUniqueSlug());
  }, []);

  return (
    <Link
      className={`${className ?? ""} duration-300 ease-in-out hover:opacity-75`}
      href={`/experience/create/${slug}/description`}
    >
      Host an Experience
    </Link>
  );
};

export default CreateExperienceButton;
