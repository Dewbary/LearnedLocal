import * as React from "react";
import BlogLayout from "../BlogLayout";
import Head from "next/head";
import Container from "~/components/common/Layout/Container";
import Intro from "./Intro";
import HeroPost from "./HeroPost";
import MoreStories from "./MoreStories";
import { PostInfo } from "~/components/types";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  posts: PostInfo[];
};

const BlogLanding = ({ posts }: Props) => {
  const [heroPost, ...morePosts] = posts || [];
  return (
    <>
      <BlogLayout>
        <Head>
          <title>{`Learned Local Blog`}</title>
        </Head>
        <Link href="/home" className="flex flex-row items-center pt-4 pl-4">
          <ChevronLeftIcon className="mr-2 h-5 w-5" />
          {"Back to Learned Local"}
        </Link>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title ?? ""}
              coverImage={heroPost.coverImage}
              date={heroPost.publishedAt}
              author={heroPost.author?.name ?? ""}
              slug={heroPost.slug?.current ?? ""}
              excerpt={heroPost.excerpt ?? ""}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </BlogLayout>
    </>
  );
};

export default BlogLanding;
