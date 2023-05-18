import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.profile.findFirst({
            where: {
                userId: ctx.userId
            }
        });
    }),

    setProfile: protectedProcedure
        .input(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                bio: z.string(),
                qualis: z.string(),
                instagram: z.string(),
                facebook: z.string(),
                venmo: z.string(),
                zelle: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.profile.updateMany({
                where: { userId: ctx.userId },
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    bio: input.bio,
                    qualis: input.qualis,
                    instagram: input.instagram,
                    facebook: input.facebook,
                    venmo: input.venmo,
                    zelle: input.zelle
                }
            });
    })
});