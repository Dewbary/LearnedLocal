import { PrismaClient } from "packages/db";

export type AppContext = {
  userId: string | null;
  prisma: PrismaClient;
};

export type ClerkParams = {
  limit?: number;
  last_active_at_since?: number;
};
