import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import BlogLayout from "../BlogPage/BlogLayout";
import Container from "~/components/common/Layout/Container";
import NavBar from "~/components/NavBar/NavBar";
import MoreStories from "../BlogPage/BlogLanding/MoreStories";
import PostTitle from "./PostTitle";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody";
import SectionSeparator from "~/components/common/Layout/SectionSeparator";
import { PostInfo } from "~/components/types";
import { urlForImage } from "~/utils/sanityClient";

type Props = {
  data?: {
    post: PostInfo | null;
    // morePosts: PostInfo[] | null;
  };
};

export default function Post({ data = { post: null } }: Props) {
  const router = useRouter();

  const { post } = data;
  const slug = post?.slug;

  // if (!router.isFallback && !slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  if (!post) return <div>empty post</div>;

  return (
    <BlogLayout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title ?? ""} | Next.js Blog Example with sanity`}
                </title>
                {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit("crop")
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                title={post.title ?? ""}
                coverImage={post.coverImage}
                date={post.publishedAt}
                author={post.author?.name ?? ""}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {/* {morePosts && morePosts.length > 0 && (
              <MoreStories posts={morePosts} />
            )} */}
          </>
        )}
      </Container>
    </BlogLayout>
  );
}
