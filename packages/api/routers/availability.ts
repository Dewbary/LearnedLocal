import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const availabilityRouter = createTRPCRouter({
  createBatch: protectedProcedure
    .input(
      z.array(
        z.object({
          experienceId: z.number(),
          startTime: z.date().nullable(),
          endTime: z.date().nullable(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.experienceAvailability.createMany({
        data: input.map((availability) => ({
          experienceId: availability.experienceId,
          startTime: availability.startTime,
          endTime: availability.endTime,
        })),
      });
    }),

  updateAvailabilities: protectedProcedure
    .input(
      z.object({
        experienceId: z.number(),
        availabilities: z.array(
          z.object({
            id: z.number().optional(),
            startTime: z.date().nullable(),
            endTime: z.date().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingAvailabilities =
        await ctx.prisma.experienceAvailability.findMany({
          where: {
            experienceId: input.experienceId,
          },
        });

      const inputAvailabilityIds = input.availabilities
        .map((a) => a.id)
        .filter(Boolean); // filter out undefined
      const toDelete = existingAvailabilities
        .map((a) => a.id)
        .filter((id) => !inputAvailabilityIds.includes(id)); // IDs not in the input

      await ctx.prisma.experienceAvailability.deleteMany({
        where: {
          id: { in: toDelete },
        },
      });

      await Promise.all(
        input.availabilities.map((availability) =>
          availability.id &&
          existingAvailabilities.some((a) => a.id === availability.id)
            ? ctx.prisma.experienceAvailability.update({
                where: { id: availability.id },
                data: {
                  startTime: availability.startTime,
                  endTime: availability.endTime,
                },
              })
            : ctx.prisma.experienceAvailability.create({
                data: {
                  experienceId: input.experienceId,
                  startTime: availability.startTime,
                  endTime: availability.endTime,
                },
              })
        )
      );

      return true;
    }),
});
