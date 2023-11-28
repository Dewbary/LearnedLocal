import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import sendTextMessage from "../utils/twilio";

export const textListRouter = createTRPCRouter({
  sendTextMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.userId !== process.env.ADMIN_USER_ID) {
        return;
      }
      const contacts = await ctx.prisma.phoneContact.findMany({
        select: { phoneNumber: true },
      });

      contacts.forEach(async (contact) => {
        await sendTextMessage(contact.phoneNumber, input.message);
      });
    }),

  addToTextList: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await sendTextMessage(
        input,
        "Hey, this is LearnedLocal. Thanks for signing up for our date / hobby idea list! We'll keep you posted about experiences available in Utah County. You can text STOP at any time to unsubscribe."
      );
      await ctx.prisma.phoneContact.upsert({
        where: {
          phoneNumber: input,
        },
        create: {
          phoneNumber: input,
        },
        update: {},
      });
      console.log(`Added ${input} to the text list!`);
    }),

  recordHobbyPreferences: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string(),
        astronomy: z.boolean(),
        blacksmithing: z.boolean(),
        baking: z.boolean(),
        car: z.boolean(),
        gardening: z.boolean(),
        sewing: z.boolean(),
        language: z.boolean(),
        instrument: z.boolean(),
        painting: z.boolean(),
        photography: z.boolean(),
        pottery: z.boolean(),
        climbing: z.boolean(),
        sailing: z.boolean(),
        snowboarding: z.boolean(),
        sports: z.boolean(),
        yoga: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.phoneContact.upsert({
        where: {
          phoneNumber: input.phoneNumber,
        },
        update: { ...input },
        create: { ...input },
      });
    }),
});
