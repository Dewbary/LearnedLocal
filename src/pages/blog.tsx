import { client } from "../utils/sanityClient";
import { GetStaticProps } from "next";

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
};

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

const Blog = ({ posts }: Props) => {
  if (!posts) return <div>Loading...</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={post?.slug?.current}>{post?.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Blog;
