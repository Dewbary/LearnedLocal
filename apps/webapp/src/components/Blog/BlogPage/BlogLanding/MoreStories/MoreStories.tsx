import type { PostInfo } from "~/components/types";
import PostPlug from "./PostPlug";

type Props = {
  posts: PostInfo[];
};

export default function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPlug
            key={post.slug?.current}
            title={post.title ?? ""}
            coverImage={post.coverImage}
            date={post.publishedAt}
            author={post.author?.name ?? ""}
            slug={post.slug?.current}
            excerpt={post.excerpt ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
