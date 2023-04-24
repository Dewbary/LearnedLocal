import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  byUserId: protectedProcedure
    .query(async ({ ctx }) => {
    return await ctx.prisma.experience.findMany({
      where: { authorId: ctx.userId },
    });
  }),

  byCategory: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input: categoryId }) => {
      return await ctx.prisma.experience.findMany({
        where: { categoryId },
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
        theme: z.number(),
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
        photos: z.array(z.string()),
        slugId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.create({
        data: {
          authorId: ctx.userId,
          firstName: input.firstName,
          lastName: input.lastName,
          title: input.title,
          description: input.description,
          price: input.price,
          categoryId: input.theme,
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
          photos: input.photos,
          slugId: input.slugId,
        },
      });
    }),
});
