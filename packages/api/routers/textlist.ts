import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import sendTextMessage from "../utils/twilio";

export const textListRouter = createTRPCRouter({
    addToTextList: publicProcedure
        .input(z.string())
        .mutation(async ({ctx, input}) => {

            await sendTextMessage(input, "Hey, this is LearnedLocal. Thanks for signing up for our date / hobby idea list! We'll keep you posted about experiences available in Utah County.");
            await ctx.prisma.phoneContact.create({
                data: {
                    phoneNumber: input
                }
            });
            console.log(`Added ${input} to the text list!`);
        })
})