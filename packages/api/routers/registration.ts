import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { sendCancelationEmail } from "../utils/sendgrid";
import { startOfToday } from "date-fns";

export const registrationRouter = createTRPCRouter({
  byExperience: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.registration.findMany({
      where: { experienceId: input },
    });
  }),

  activeRegistrationByExpId: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {

      const activeRegistration = await ctx.prisma.registration.findMany({
        where: {
          experienceId: input,
          userId: ctx.userId,
          availability: {
            startTime: {
              gte: startOfToday()
            }
          }
        },
        include: {
          availability: true,
          experience: true
        },
        orderBy: {
          availability: {
            startTime: "asc"
          }
        }
      });

      return activeRegistration[0];
    }),
  
  changeRegistrationAvailability: protectedProcedure
    .input(z.object({
      registrationId: z.string(),
      newAvailabilityId: z.number()
    }))
    .mutation(async ({ctx, input}) => {

      // First check to make sure this user is allowed to change this registration
      const registration = await ctx.prisma.registration.findUnique({
        where: {
          id: input.registrationId
        }
      });
      if (!registration) return "registration_does_not_exist";
      if (ctx.userId !== registration.userId) return "not_authorized";

      // Next check to make sure there is space in the availability being changed to
      const availability = await ctx.prisma.experienceAvailability.findUnique({
        where: {
          id: input.newAvailabilityId
        },
        include: {
          experience: true,
          registrations: true
        }
      });
      let totalRegistrants = 0;
      availability?.registrations.forEach(registration => totalRegistrants += registration.partySize);
      if (totalRegistrants + registration.partySize > (availability?.experience.maxAttendees || 0)) {
        return "not_enough_space";
      }

      // Finally, update the registration
      await ctx.prisma.registration.update({
        where: {
          id: input.registrationId
        },
        data: {
          availabilityId: input.newAvailabilityId
        }
      });

      return "success";
    }),

  registrantCountByExperience: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const registrations = await ctx.prisma.registration.findMany({
        where: { experienceId: input },
      });

      let totalRegistrants = 0;

      registrations.forEach((registration) => {
        totalRegistrants += registration.partySize;
      });

      return totalRegistrants;
    }),

  removeRegistrant: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedRegistration = await ctx.prisma.registration.delete({
        where: { id: input },
      });

      const experience = await ctx.prisma.experience.findFirst({
        where: { id: deletedRegistration.experienceId },
        include: { availability: true, profile: true },
      });

      const hostProfile = await ctx.prisma.profile.findFirst({
        where: { userId: experience?.authorId },
      });

      if (experience && hostProfile) {
        await sendCancelationEmail({
          recipientEmail: deletedRegistration.email,
          experience: experience,
          hostProfile: hostProfile,
        });
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
        availabilityId: z.number(),
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
          availabilityId: input.availabilityId,
          stripeCheckoutSessionId: input.stripeCheckoutSessionId,
          status: input.status,
        },
      });

      return newRegistration;
    }),
});
