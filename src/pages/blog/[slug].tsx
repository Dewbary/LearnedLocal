/* eslint-disable */

import { client } from "~/utils/sanityClient";
import { Post } from "./blog";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";

type Props = {
  blogPost: Post;
};

const Post = ({ blogPost }: Props) => {
  return (
    <div className="h-full w-full">
      <div>{blogPost.title}</div>
      <div>{blogPost.body}</div>
    </div>
  );
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);

  const paths = slugs.map((slug: string) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: any): Promise<GetStaticPropsResult<Props>> => {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body
  }`;

  const blogPost: Post = await client.fetch(query, { slug });

  // console.log("myPost", blogPost.body[0].children[0].text);
  return {
    props: {
      blogPost: { ...blogPost, body: blogPost?.body[0]?.children[0]?.text },
    },
  };
};

export default Post;
