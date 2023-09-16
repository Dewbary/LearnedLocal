import * as React from "react";

type Props = {
  posts: Post[];
};

export type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
};

const Blog = ({ posts }: Props) => {
  if (!posts) return <div>Loading...</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`blog/${post?.slug?.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Blog;
