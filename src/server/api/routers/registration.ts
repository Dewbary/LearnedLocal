import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const registrationRouter = createTRPCRouter({
  byExperience: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.prisma.registration.findMany({
        where: { experienceId: input },
      });
    }),

  removeRegistrant: publicProcedure
    .input(z.string())
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.registration.delete({
        where: {id: input}
      })
    }),
});
