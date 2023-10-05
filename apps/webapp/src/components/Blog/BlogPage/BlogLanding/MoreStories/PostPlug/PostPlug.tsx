import Link from "next/link";
import CoverImage from "../../CoverImage";
import Date from "../../../Date";
import type { CoverImageInfo } from "~/components/types";

type Props = {
  title: string;
  coverImage: CoverImageInfo | undefined;
  date: string | undefined;
  excerpt: string;
  author: string;
  slug: string | undefined;
};

export default function PostPlug({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        {slug && (
          <Link href={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        )}
      </h3>
      <div className="mb-4 text-lg">{date && <Date dateString={date} />}</div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      {author && <div className="text-xl font-bold">{author}</div>}
    </div>
  );
}
