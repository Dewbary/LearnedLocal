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
        content: true,
        price: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        price: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.session.user.id,
          price: input.price,
        },
      });
    }),
});
