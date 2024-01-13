import type { GetStaticProps } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import HomePage from "../../components/Home/HomePage";
import { appRouter } from "packages/api";
import superjson from "superjson";
import prisma from "packages/api/db";
import type { SerializedExperienceInfo } from "~/components/types";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { deserialize } from "~/utils/experience";
import { startOfToday } from "date-fns";

export const getStaticProps: GetStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: null,
    },
    transformer: superjson,
  });

  const experiences: ExperienceInfo[] = await helpers.experience.getAll.fetch();

  experiences.sort((a, b) => {
    return (
      calculateExperiencePriorityScore(b) - calculateExperiencePriorityScore(a)
    );
  });

  const serializedExperiences = experiences.map((experience) => {
    return {
      ...experience,
      createdAt: experience.createdAt.toISOString(),
      updatedAt: experience.updatedAt.toISOString(),
      availability: experience.availability.map((availability) => {
        return {
          ...availability,
          startTime: availability.startTime?.toISOString() ?? null,
          endTime: availability.endTime?.toISOString() ?? null,
        };
      }),
    };
  });

  return {
    props: {
      experiences: serializedExperiences,
    },
  };
};

const calculateExperiencePriorityScore = (exp: ExperienceInfo) => {
  if (exp.availability && exp.availability.length > 0) {
    const nearestAvail = exp.availability.reduce((acc, curr) => {
      if (curr.startTime === null || acc.startTime === null) {
        return acc;
      }

      if (curr.startTime < acc.startTime && curr.startTime > startOfToday()) {
        return curr;
      } else {
        return acc;
      }
    });

    if (nearestAvail.startTime === null) return 0;

    if (!(nearestAvail.startTime > startOfToday())) {
      if (exp.isFutureExperience) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 3005700800011 - nearestAvail.startTime.getTime();
    }
  } else if (exp.isFutureExperience) {
    return 1;
  } else {
    return 0;
  }
};

const Home = ({ experiences }: { experiences: SerializedExperienceInfo[] }) => {
  return (
    <>
      <main>
        <HomePage experiences={deserialize(experiences)} />
      </main>
    </>
  );
};

export default Home;
