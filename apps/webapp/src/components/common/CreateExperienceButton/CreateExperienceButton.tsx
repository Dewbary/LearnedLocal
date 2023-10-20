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
      className={`${className ?? ""}`}
      href={`experience/create/${slug}`}
    >
      Create an Experience
    </Link>
  );
};

export default CreateExperienceButton;
