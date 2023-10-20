import type { GetStaticProps } from "next";
import Head from "next/head";
import { createServerSideHelpers } from "@trpc/react-query/server";
import HomePage from "../components/Home/HomePage";
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
          date: availability.date?.toISOString() ?? null,
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
      if (curr.date === null || acc.date === null) {
        return acc;
      }

      if (curr.date < acc.date && curr.date > startOfToday()) {
        return curr;
      } else {
        return acc;
      }
    });

    if (nearestAvail.date === null) return 0;

    if (!(nearestAvail.date > startOfToday())) {
      if (exp.isFutureExperience) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 3005700800011 - nearestAvail.date.getTime();
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
      <Head>
        <title>Learned Local - Fun Things To Do in Utah</title>
        <link rel="icon" href="../public/favicon.ico" />
        <meta
          name="description"
          content="Looking for fun date night ideas or things to do in Provo and Utah County? Come learn a new hobby from someone near you with Learned Local!"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="p:domain_verify"
          content="8bf5b0989b5c6f95babbbf49bcf00700"
        />
      </Head>

      <main>
        <HomePage experiences={deserialize(experiences)} />
      </main>
    </>
  );
};

export default Home;
