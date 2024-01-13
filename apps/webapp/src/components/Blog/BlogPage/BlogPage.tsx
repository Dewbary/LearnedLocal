import * as React from "react";
import BlogLanding from "./BlogLanding";
import type { PostInfo } from "~/components/types";

type Props = {
  posts: PostInfo[];
};

const BlogPage = ({ posts }: Props) => {
  return <BlogLanding posts={posts} />;
};

export default BlogPage;
