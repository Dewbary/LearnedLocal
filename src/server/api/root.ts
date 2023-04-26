import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { experienceRouter } from "~/server/api/routers/experience";
import { categoryRouter } from "./routers/category";
import { paymentRouter } from "./routers/payment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  experience: experienceRouter,
  category: categoryRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
