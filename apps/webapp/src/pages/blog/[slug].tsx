import { client } from "~/utils/sanityClient";
import Post from "~/components/Blog/Post";
import {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { PostInfo } from "~/components/types";

type Props = {
  data: {
    post: PostInfo;
  };
};

const PostPage = ({ data }: Props) => {
  return (
    <div>
      <Post data={data} />
    </div>
  );
};

const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  content,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`;

const postQuery = `*[_type == "post" && slug.current == $slug][0] {${postFields}}`;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const blogPost: PostInfo = await client.fetch(postQuery, {
    slug: params?.slug,
  });

  const data = {
    post: blogPost,
  };

  console.log(data);
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const slugs: string[] = await client.fetch(`*[_type == "post"].slug.current`);

  const paths = slugs.map((slug: string) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
