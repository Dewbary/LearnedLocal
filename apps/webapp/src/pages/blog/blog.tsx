import * as React from "react";
import BlogPage from "~/components/BlogPage";

type Props = {
  posts: Post[];
};

export type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  body: any;
};

const Blog = ({ posts }: Props) => {
  if (!posts) return <div>Loading...</div>;

  return <BlogPage posts={posts} />;
};

export default Blog;
