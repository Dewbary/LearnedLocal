import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { sendCancelationEmail } from "~/utils/sendgrid";

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

      let totalRegistrants = 0;

      registrations.forEach(registration => {
        totalRegistrants += registration.partySize;
      })

      return totalRegistrants;
    }),

  removeRegistrant: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedRegistration =  await ctx.prisma.registration.delete({
        where: { id: input },
      });

      const experience = await ctx.prisma.experience.findFirst({
        where: {id: deletedRegistration.experienceId}
      })

      if (experience) {
        sendCancelationEmail({ recipientEmail: deletedRegistration.email, experience: experience });
      }

      return deletedRegistration;
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

      const newRegistration = await ctx.prisma.registration.create({
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

      return newRegistration;
    }),
});
