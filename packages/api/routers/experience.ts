import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "packages/api/trpc";
import { sendExperienceCreationEmail } from "packages/api/utils/sendgrid";
import { createExperienceAndPrice } from "~/utils/stripe";
import { startOfToday } from "date-fns";
import { env } from "~/env.mjs";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      where: {
        verified: true,
      },
      include: {
        profile: true,
        availability: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });
  }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const currentDate = new Date();

    let experiences = await ctx.prisma.experience.findMany({
      where: {
        availability: {
          some: {
            date: {
              gte: currentDate,
            },
          },
        },
      },
      include: {
        profile: true,
        availability: true,
      },
    });

    // Filter out past availabilities
    experiences = experiences.map((experience) => ({
      ...experience,
      ExperienceAvailability: experience.availability.filter(
        (availability) => !availability.date || availability.date >= currentDate
      ),
    }));

    // Sort experiences based on the earliest upcoming availability
    experiences.sort((a, b) => {
      const earliestA = a.availability
        .filter((avail) => avail.date && avail.date !== null)
        .reduce((prev, curr) => {
          if (!prev) return curr;
          if (!prev.date) return curr;
          if (!curr.date) return prev;
          return prev.date < curr.date ? prev : curr;
        }, a.availability[0]);
      const earliestB = b.availability.reduce((prev, curr) => {
        if (!prev) return curr;
        if (!prev.date) return curr;
        if (!curr.date) return prev;
        return prev.date < curr.date ? prev : curr;
      }, b.availability[0]);

      if (!earliestA || !earliestA.date || !earliestB || !earliestB.date) {
        return 0;
      }

      return earliestA.date.getTime() - earliestB.date.getTime();
    });

    return experiences;
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
            availability: true,
          },
        },
      },
    });
  }),

  getExternalListings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.userId !== env.ADMIN_USER_ID) {
      console.log("Incorrect user ID:", ctx.userId);
      return;
    }

    return await ctx.prisma.experience.findMany({
      where: {
        isExternalListing: true,
      },
      include: {
        availability: true,
        profile: true
      }
    });
  }),

  byUserId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.experience.findMany({
      where: { authorId: ctx.userId },
      include: {
        profile: true,
        availability: true,
      },
    });
  }),

  byExperienceId: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.experience.findFirst({
        where: { id: input },
        include: {
          profile: true,
          availability: true,
        },
      });
    }),

  viewByExperienceId: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const queryResult = await ctx.prisma.experience.findFirst({
        where: { id: input },
        include: {
          profile: true,
          availability: true,
        },
      });

      if (!queryResult) return null;
      
      const lastAvailability = queryResult.availability.reduce((prev, curr) => {
        if (prev.date && curr.date) {
          if (prev.date > curr.date) return prev; else return curr;
        }
        else {
          return prev;
        }
      });

      const experiencePassed = lastAvailability.date && (lastAvailability.date < startOfToday());
      const experienceVerified = queryResult.verified;
      const experienceOwnerLoggedIn = (queryResult.authorId === ctx.userId);

      if (!experienceOwnerLoggedIn && (experiencePassed || !experienceVerified)) {
        return null;
      }
      else {
        return queryResult;
      }
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
        free: z.boolean(),
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
        availability: z.array(
          z.object({
            id: z.number().optional(),
            date: z.date().nullable(),
            startTime: z.date().nullable(),
            endTime: z.date().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedExperience = await ctx.prisma.experience.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          free: input.free,
          categoryId: input.categoryId,
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
          profileId: input.profileId,
        },
        include: {
          availability: true,
        },
      });

      return updatedExperience;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        free: z.boolean(),
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
        availability: z.array(
          z.object({
            id: z.number().optional(),
            date: z.date().nullable(),
            startTime: z.date().nullable(),
            endTime: z.date().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, priceId } = await createExperienceAndPrice({
        title: input.title,
        description: input.description,
        amount: Math.round(input.price * 100), // Stripe uses cents, so multiply by 100 to convert the price to cents
        currency: "usd",
      });



      const newExperience = await ctx.prisma.experience.create({
        data: {
          authorId: ctx.userId,
          title: input.title,
          description: input.description,
          price: input.price,
          free: input.free,
          categoryId: input.categoryId,
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
          profileId: input.profileId,
          availability: {
            create: input.availability.map((a) => ({
              date: a.date,
              startTime: a.startTime,
              endTime: a.endTime,
            })),
          },
        },
        include: {
          availability: true,
        },
      });

      const newExperienceInfo = await ctx.prisma.experience.findFirst({
        where: { id: newExperience.id },
        include: {
          profile: true,
          availability: {
            orderBy: {
              startTime: 'asc'
            },
            take: 1,
          }
        },
      });

      if (newExperienceInfo) {
        await sendExperienceCreationEmail({experience: newExperienceInfo});
      }

      return newExperience;
    }),

  createExternalListing: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        free: z.boolean(),
        city: z.string().nullable(),
        photos: z.array(z.string()),
        categoryId: z.number(),
        profileId: z.string(),
        availabilityDate: z.date(),
        availabilityStartTime: z.date(),
        availabilityEndTime: z.date()
      })
    )
    .mutation(async ({ctx, input}) => {
      await ctx.prisma.experience.create({
        data: {
          authorId: ctx.userId,
          title: input.title,
          description: input.description,
          price: input.price,
          free: input.free,
          categoryId: input.categoryId,
          timeline: "EXTERNAL_LISTING",
          city: input.city,
          location: '{"lat":0,"lng":0}',
          locationDescription: "EXTERNAL_LISTING",
          qualifications: "EXTERNAL_LISTING",
          provided: "EXTERNAL_LISTING",
          guestRequirements: "EXTERNAL_LISTING",
          minAge: 0,
          activityLevel: "EXTERNAL_LISTING",
          skillLevel: "EXTERNAL_LISTING",
          maxAttendees: 1000,
          photos: input.photos,
          slugId: "EXTERNAL_LISTING",
          stripeProductId: "EXTERNAL_LISTING",
          stripePriceId: "EXTERNAL_LISTING",
          profileId: input.profileId,
          availability: {
            create: {
              date: input.availabilityDate,
              startTime: input.availabilityStartTime,
              endTime: input.availabilityEndTime,
            },
          },
        }
      })
    })
});
