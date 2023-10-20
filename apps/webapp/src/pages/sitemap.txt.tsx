import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import { appRouter } from "packages/api";
import prisma from "packages/api/db";
import superjson from "superjson";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";

function generateSiteMap(availableExperiences: ExperienceInfo[]) {
  let siteMap = `https://learnedlocal.app
https://www.learnedlocal.app
https://learnedlocal.app/host
https://learnedlocal.app/about
https://www.learnedlocal.app/host
https://www.learnedlocal.app/about`;

  availableExperiences.forEach((experience) => {
    siteMap = siteMap.concat(
      "\n",
      `https://www.learnedlocal.app/experience/view/${experience.id}`
    );
  });

  return siteMap;
}

export default function SiteMap() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: null,
    },
    transformer: superjson,
  });

  const availableExperiences = await helpers.experience.getAll.fetch();
  const siteMap = generateSiteMap(availableExperiences);

  context.res.setHeader("Content-Type", "text/plain");
  context.res.write(siteMap);
  context.res.end();

  return {
    props: {},
  };
}
