import Link from "next/link";
import * as React from "react";
import { Post } from "~/pages/blog/blog";

type Props = {
  posts: Post[];
};

const BlogPage = ({ posts }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <h1>Learned Local Blog</h1>

      {/* <HeroPost /> */}

      <div className="flex flex-1 flex-col">
        <div>Post List </div>
        <ul className="flex flex-1">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`blog/${post?.slug?.current ?? ""}`}
                className="button m-4 w-24 bg-slate-200 p-2"
              >
                {post?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;
