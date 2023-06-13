import { Registration } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createExperienceAndPrice } from "~/utils/stripe";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      where: {
        verified: true,
      },
      include: {
        profile: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }),

  getRegistered: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.registration.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        experience: {
          include: {
            profile: true,
          }
        }
      },
    });
  }),

  byUserId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.experience.findMany({
      where: { authorId: ctx.userId },
      include: {
        profile: true,
      }
    });
  }),

  byExperienceId: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.experience.findFirst({
        where: { id: input },
      });
    }),

  byCategory: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input: categoryId }) => {
      return await ctx.prisma.experience.findMany({
        where: { categoryId },
      });
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.experience.delete({
        where: { id: input },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        date: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        timeline: z.string(),
        city: z.string().nullable(),
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
        categoryId: z.number(),
        profileId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.experience.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          categoryId: input.categoryId,
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          timeline: input.timeline,
          city: input.city,
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
          profileId: input.profileId
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        date: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        timeline: z.string(),
        city: z.string().nullable(),
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
        categoryId: z.number(),
        profileId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, priceId } = await createExperienceAndPrice({
        title: input.title,
        description: input.description,
        amount: Math.round(input.price * 100), // Stripe uses cents, so multiply by 100 to convert the price to cents
        currency: "usd",
      });

      return ctx.prisma.experience.create({
        data: {
          authorId: ctx.userId,
          title: input.title,
          description: input.description,
          price: input.price,
          categoryId: input.categoryId,
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          timeline: input.timeline,
          city: input.city,
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
          stripeProductId: productId,
          stripePriceId: priceId,
          profileId: input.profileId
        },
      });
    }),
});
