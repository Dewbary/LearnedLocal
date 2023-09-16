import { GetStaticProps } from "next";
import { client } from "~/utils/sanityClient";
import { Post } from "./blog";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

export { default } from "./blog";
