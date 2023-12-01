import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import { appRouter } from "packages/api";
import prisma from "packages/api/db";
import superjson from "superjson";
import NewViewExperiencePage from "~/components/NewViewExperience/NewViewExperiencePage";

export default NewViewExperiencePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const experienceId = Number(context.params?.slug?.at(0));

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
