import CoverImage from "../../BlogPage/BlogLanding/CoverImage";
import PostTitle from "../PostTitle";
import Date from "../../BlogPage/Date";
import type { Author, CoverImageInfo } from "~/components/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  title: string;
  coverImage: CoverImageInfo | undefined;
  date: string | undefined;
  author: string;
};

export default function PostHeader({ title, coverImage, date, author }: Props) {
  const router = useRouter();

  return (
    <>
      <button
        className="mt-4 flex flex-row items-center"
        type="button"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon className="mr-2 h-5 w-5" />
        Back
      </button>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <div className="text-md italic">{author}</div>}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage
          title={title}
          image={coverImage}
          priority
          className="max-h-96"
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <div className="text-xl font-bold">{author}</div>}
        </div>
        <div className="mb-6 text-lg">
          {/* <Date dateString={date.toISOString()} /> */}
        </div>
      </div>
    </>
  );
}
