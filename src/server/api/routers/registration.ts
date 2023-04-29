import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const registrationRouter = createTRPCRouter({
  byExperience: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.registration.findMany({
      where: { experienceId: input },
    });
  }),

  registrantCountByExperience: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const registrations = await ctx.prisma.registration.findMany({
        where: { experienceId: input },
      });
      return registrations.length;
    }),

  removeRegistrant: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registration.delete({
        where: { id: input },
      });
    }),

  createRegistration: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        registrantFirstName: z.string(),
        registrantLastName: z.string(),
        partySize: z.number(),
        email: z.string(),
        experienceId: z.number(),
        stripeCheckoutSessionId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registration.create({
        data: {
          userId: input.userId,
          registrantFirstName: input.registrantFirstName,
          registrantLastName: input.registrantLastName,
          partySize: input.partySize,
          email: input.email,
          experienceId: input.experienceId,
          stripeCheckoutSessionId: input.stripeCheckoutSessionId,
          status: input.status,
        },
      });
    }),
});
