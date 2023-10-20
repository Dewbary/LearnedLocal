import type { GetStaticProps } from "next";
import type { PostInfo } from "~/components/types";
import { client } from "~/utils/sanityClient";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch<PostInfo[]>(
    `*[_type == "post"]{title, slug, content, excerpt, coverImage, author->, categories, publishedAt}`
  );

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

export { default } from "./blog";
