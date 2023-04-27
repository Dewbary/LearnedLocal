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

  registrantCountByExperience: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const registrations = await ctx.prisma.registration.findMany({
        where: { experienceId: input }
      });
      return registrations.length;
    }),

  removeRegistrant: publicProcedure
    .input(z.string())
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.registration.delete({
        where: {id: input}
      })
    }),
});
