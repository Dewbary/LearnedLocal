import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const profileRouter = createTRPCRouter({

    getPublicProfile: publicProcedure
        .input(
            z.object({
                userId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
        return await ctx.prisma.profile.findFirst({
            where: {
                userId: input.userId
            }
        });
    }),

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
                social: z.string(),
                venmo: z.string(),
                zelle: z.string(),
                email: z.string(),
                phone: z.string(),
                profileImage: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.profile.updateMany({
                where: { userId: ctx.userId },
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    bio: input.bio,
                    social: input.social,
                    venmo: input.venmo,
                    zelle: input.zelle,
                    email: input.email,
                    phone: input.phone,
                    profileImage: input.profileImage
                }
            });
    }),

    createProfile: protectedProcedure
        .input(
            z.object({
                firstName: z.string().min(1),
                lastName: z.string().min(1),
                bio: z.string(),
                social: z.string(),
                venmo: z.string(),
                zelle: z.string(),
                email: z.string(),
                phone: z.string(),
                profileImage: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existingProfile = await ctx.prisma.profile.findFirst({
                where: {userId: ctx.userId}
            });
            if (existingProfile) {
                return false;
            }
            else {
                await ctx.prisma.profile.create({
                    data: {
                        userId: ctx.userId,
                        firstName: input.firstName,
                        lastName: input.lastName,
                        bio: input.bio,
                        social: input.social,
                        venmo: input.venmo,
                        zelle: input.zelle,
                        email: input.email,
                        phone: input.phone,
                        profileImage: input.profileImage
                    }
                });
                return true;
            }
        }),

    deleteUser: protectedProcedure
        .mutation(async ({ctx}) => {
            await ctx.prisma.experience.deleteMany({
                where: {
                    authorId: ctx.userId
                }
            });
            await ctx.prisma.profile.deleteMany({
                where: {
                    userId: ctx.userId
                }
            });
            await clerkClient.users.deleteUser(ctx.userId);
        })
});