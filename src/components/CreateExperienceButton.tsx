import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function CreateExperienceButton() {

    const uniqueSlug = uuidv4();

    return (
      <Link className="btn-primary btn" href={`experience/create/${uniqueSlug}`}>
        Create an Experience
      </Link>
    )
}