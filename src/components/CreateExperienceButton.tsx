import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function CreateExperienceButton() {

    const uniqueSlug = uuidv4();

    return (
        <button className="btn-primary btn">
          <Link href={`experience/create/${uniqueSlug}`}>
            Create an Experience
          </Link>
        </button>
    )
}