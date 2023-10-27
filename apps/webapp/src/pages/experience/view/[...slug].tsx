import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import { appRouter } from "packages/api";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "packages/api/db";
import superjson from "superjson";
import ViewExperiencePage from "~/components/ViewExperience/ViewExperiencePage";

export default ViewExperiencePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const experienceId = Number(context.params?.slug?.at(0));
  // const { userId } = getAuth(context.req);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: null,
    },
    transformer: superjson,
  });

  await helpers.experience.viewByExperienceId.prefetch(experienceId);
  await helpers.registration.byExperience.prefetch(experienceId);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      experienceId,
    },
  };
}
