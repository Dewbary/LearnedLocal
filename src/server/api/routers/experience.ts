import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      select: {
        title: true,
        // content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        theme: z.string(),
        date: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        timeline: z.string(),
        location: z.object({ lat: z.number(), lng: z.number() }),
        locationDescription: z.string(),
        qualifications: z.string(),
        provided: z.string(),
        guestRequirements: z.string(),
        minAge: z.number(),
        activityLevel: z.string(),
        skillLevel: z.string(),
        maxAttendees: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.create({
        data: {
          authorId: ctx.session.user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          title: input.title,
          description: input.description,
          price: input.price,
          theme: input.theme,
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          timeline: input.timeline,
          location: input.location,
          locationDescription: input.locationDescription,
          qualifications: input.qualifications,
          provided: input.provided,
          guestRequirements: input.guestRequirements,
          minAge: input.minAge,
          activityLevel: input.activityLevel,
          skillLevel: input.skillLevel,
          maxAttendees: input.maxAttendees,
        },
      });
    }),
});
