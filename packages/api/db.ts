import { PrismaClient } from "@learnedlocal/db";
import { env } from "@learnedlocal/config/env.mjs";

const prismaClientSingleton = () => {
  const prismaClient = new PrismaClient();

  prismaClient.$use(async (params, next) => {
    if (
      (params.model === "Experience" ||
        params.model === "ExperienceAvailability" ||
        params.model === "Profile") &&
      (params.action === "create" ||
        params.action === "createMany" ||
        params.action === "delete" ||
        params.action === "deleteMany" ||
        params.action === "update" ||
        params.action === "updateMany" ||
        params.action === "upsert")
    ) {
      fetch(
        `https://learnedlocal.app/api/webhooks/revalidate-site?secret=${process.env.EDGE_FUNCTION_VERIFICATION_TOKEN}`
      );

      console.log("Revalidating homepage");
    }

    return next(params);
  });

  return prismaClient;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
