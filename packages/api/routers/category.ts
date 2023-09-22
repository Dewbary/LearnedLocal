import { createTRPCRouter, protectedProcedure } from "packages/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
});
