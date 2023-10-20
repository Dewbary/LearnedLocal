import * as React from "react";
import BlogPage from "~/components/Blog/BlogPage";
import type { PostInfo } from "~/components/types";

type Props = {
  posts: PostInfo[];
};

const Blog = ({ posts }: Props) => {
  if (!posts) return <div>Loading...</div>;

  return <BlogPage posts={posts} />;
};

export default Blog;
