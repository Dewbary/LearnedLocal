import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const availabilityRouter = createTRPCRouter({
  createBatch: protectedProcedure
    .input(
      z.array(
        z.object({
          experienceId: z.number(),
          date: z.date().nullable(),
          startTime: z.date().nullable(),
          endTime: z.date().nullable(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.experienceAvailability.createMany({
        data: input.map((availability) => ({
          experienceId: availability.experienceId,
          date: availability.date,
          startTime: availability.startTime,
          endTime: availability.endTime,
        })),
      });
    }),
});
