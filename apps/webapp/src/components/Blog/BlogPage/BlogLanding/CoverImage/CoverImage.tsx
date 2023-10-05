import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import type { CoverImageInfo } from "~/components/types";
import { urlForImage } from "~/utils/sanityClient";

type Props = {
  title: string;
  slug?: string;
  image: CoverImageInfo | undefined;
  priority?: boolean;
};

export default function CoverImage({
  title,
  slug,
  image: source,
  priority = false,
}: Props) {
  const image =
    source != source?.asset?._ref ? (
      <div
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug,
        })}
      >
        {source && (
          <Image
            className="h-auto w-full"
            width={2000}
            height={1000}
            alt={`Cover Image for ${title}`}
            src={urlForImage(source).height(1000).width(2000).url()}
            sizes="100vw"
            priority={priority}
          />
        )}
      </div>
    ) : (
      <div style={{ paddingTop: "50%", backgroundColor: "#ddd" }} />
    );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
