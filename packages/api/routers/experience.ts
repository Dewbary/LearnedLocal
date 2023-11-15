import { date, z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendExperienceCreationEmail } from "../utils/sendgrid";
import { add, addDays, startOfDay, startOfToday, startOfWeek, sub } from "date-fns";
import { env } from "@learnedlocal/config/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export type StripeProductInfo = {
  title: string;
  description: string;
  amount: number;
  currency: string;
};

export type StripeProduct = {
  productId: string;
  priceId: string;
};

export const createExperienceAndPrice = async ({
  title,
  description,
  amount,
  currency,
}: StripeProductInfo): Promise<StripeProduct> => {
  const product = await stripe.products.create({ name: title, description });

  const price = await stripe.prices.create({
    unit_amount: amount,
    currency,
    product: product.id,
  });

  return { productId: product.id, priceId: price.id };
};

const getFridayOfCurrentWeek = function () {
  // Get the start of the current week (assuming Monday is the first day of the week)
  const startOfWeekDate = startOfDay(startOfWeek(new Date(), { weekStartsOn: 1 })); // 1 corresponds to Monday

  // Calculate the date of Friday by adding 4 days to the start of the week
  const fridayDate = addDays(startOfWeekDate, 4);

  // ADJUST FOR TIMEZONE -- THIS IS SUPER HACKY AND SHOULD BE CHANGED
  //const adjustedFridayDate = sub(fridayDate, {hours: 7});

  return fridayDate;
}

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
            startTime: "desc",
          },
        },
      },
    });
  }),

  getAllAdmin: protectedProcedure.query(({ ctx }) => {
    if (ctx.userId !== process.env.ADMIN_USER_ID) {
      return;
    }
    return ctx.prisma.experience.findMany({
      include: {
        profile: true,
        availability: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }),

  getRecommended: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      const recommendedExperiences = ctx.prisma.experience.findMany({
        where: {
          availability: {
            some: {
              AND: [
                {
                  startTime: {
                    gte: getFridayOfCurrentWeek()
                  }
                },
                {
                  startTime: {
                    lt: add(getFridayOfCurrentWeek(), {days: 3})
                  }
                }
              ]
            }
          },
          verified: true,
        },
        include: {
          availability: true,
          profile: true
        },
      });

      return recommendedExperiences;
    }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const currentDate = new Date();

    let experiences = await ctx.prisma.experience.findMany({
      where: {
        availability: {
          some: {
            startTime: {
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
        (availability) =>
          !availability.startTime || availability.startTime >= currentDate
      ),
    }));

    // Sort experiences based on the earliest upcoming availability
    experiences.sort((a, b) => {
      const earliestA = a.availability
        .filter((avail) => avail.startTime && avail.startTime !== null)
        .reduce((prev, curr) => {
          if (!prev) return curr;
          if (!prev.startTime) return curr;
          if (!curr.startTime) return prev;
          return prev.startTime < curr.startTime ? prev : curr;
        }, a.availability[0]);
      const earliestB = b.availability.reduce((prev, curr) => {
        if (!prev) return curr;
        if (!prev.startTime) return curr;
        if (!curr.startTime) return prev;
        return prev.startTime < curr.startTime ? prev : curr;
      }, b.availability[0]);

      if (
        !earliestA ||
        !earliestA.startTime ||
        !earliestB ||
        !earliestB.startTime
      ) {
        return 0;
      }

      return earliestA.startTime.getTime() - earliestB.startTime.getTime();
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

      // First, remove all the availabilities that have already passed, put the remaining in an object
      const availabilitiesFiltered = queryResult?.availability.filter(
        (availability) => {
          if (availability.startTime) {
            return availability.startTime > startOfToday();
          } else {
            return false;
          }
        }
      );

      // Second, reattach those availabilities to the main object
      const filteredExperienceInfo = {
        ...queryResult,
        availability: availabilitiesFiltered,
      };

      // Third, sort the availabilities by their date
      filteredExperienceInfo?.availability?.sort((a, b) => {
        if ((a.startTime?.getTime() || 0) <= (b.startTime?.getTime() || 0)) {
          return -1;
        } else {
          return 1;
        }
      });

      // Finally, only allow the user to see the experience if it is verified or it is the experience author viewing the experience
      const experienceVerified = filteredExperienceInfo.verified;
      const experienceOwnerLoggedIn =
        filteredExperienceInfo.authorId === ctx.userId;

      if (experienceOwnerLoggedIn || experienceVerified) {
        return filteredExperienceInfo;
      } else {
        return null;
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
              startTime: "asc",
            },
            take: 1,
          },
        },
      });

      if (newExperienceInfo) {
        await sendExperienceCreationEmail({ experience: newExperienceInfo });
      }

      return newExperience;
    }),

  administerExperience: protectedProcedure
    .input(
      z.object({
        experienceId: z.number(),
        verify: z.boolean(),
        externalListing: z.boolean(),
        externalListingLink: z.string().nullable(),
        futureListing: z.boolean(),
        externalHostName: z.string().nullable(),
        isFull: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.userId !== process.env.ADMIN_USER_ID) {
        return;
      }

      return await ctx.prisma.experience.update({
        where: {
          id: input.experienceId,
        },
        data: {
          verified: input.verify,
          isExternalListing: input.externalListing,
          isFutureExperience: input.futureListing,
          externalListingLink: input.externalListingLink,
          externalHostName: input.externalHostName,
          isFull: input.isFull,
        },
      });
    }),
});
