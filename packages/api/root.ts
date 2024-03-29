import { createTRPCRouter } from "./trpc";
import { experienceRouter } from "./routers/experience";
import { categoryRouter } from "./routers/category";
import { paymentRouter } from "./routers/payment";
import { registrationRouter } from "./routers/registration";
import { profileRouter } from "./routers/profile";
import { availabilityRouter } from "./routers/availability";
import { emailRouter } from "./routers/email";
import { textListRouter } from "./routers/textlist";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  experience: experienceRouter,
  category: categoryRouter,
  payment: paymentRouter,
  registration: registrationRouter,
  profile: profileRouter,
  availability: availabilityRouter,
  email: emailRouter,
  textlist: textListRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
