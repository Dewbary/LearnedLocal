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

    createOrUpdateProfile: protectedProcedure
        .input(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                personalTitle: z.string().nullable(),
                bio: z.string().nullable(),
                social: z.string().nullable(),
                insta: z.string().nullable(),
                facebook: z.string().nullable(),
                venmo: z.string().nullable(),
                zelle: z.string().nullable(),
                email: z.string().nullable(),
                phone: z.string().nullable(),
                profileImage: z.string().nullable(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.profile.upsert({
                where: {
                    userId: ctx.userId
                },
                update: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    personalTitle: input.personalTitle,
                    bio: input.bio,
                    social: input.social,
                    insta: input.insta,
                    facebook: input.facebook,
                    venmo: input.venmo,
                    zelle: input.zelle,
                    email: input.email,
                    phone: input.phone,
                    profileImage: input.profileImage
                },
                create: {
                    userId: ctx.userId,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    personalTitle: input.personalTitle,
                    bio: input.bio,
                    social: input.social,
                    insta: input.insta,
                    facebook: input.facebook,
                    venmo: input.venmo,
                    zelle: input.zelle,
                    email: input.email,
                    phone: input.phone,
                    profileImage: input.profileImage
                }
            });
        }
    ),

    getProfile: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.profile.findFirst({
            where: {
                userId: ctx.userId
            }
        });
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