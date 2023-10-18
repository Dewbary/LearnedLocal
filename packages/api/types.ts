import { PrismaClient } from "packages/db";

export type AppContext = {
  userId: string | null;
  prisma: PrismaClient;
};
