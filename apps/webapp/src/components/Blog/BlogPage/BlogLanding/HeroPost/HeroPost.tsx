import Link from "next/link";
import CoverImage from "../CoverImage";
import Date from "../../Date";
import type { CoverImageInfo } from "~/components/types";

type Props = {
  title: string;
  coverImage: CoverImageInfo | undefined;
  date: string | undefined;
  excerpt: string;
  author: string;
  slug: string;
};

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            {date && <Date dateString={date} />}
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          {author && <div className="text-xl font-bold">{author}</div>}
        </div>
      </div>
    </section>
  );
}
