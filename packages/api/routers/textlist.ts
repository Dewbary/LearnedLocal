import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import sendTextMessage from "../utils/twilio";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";
import { env } from "@learnedlocal/config/env.mjs";

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  },
});

export const textListRouter = createTRPCRouter({
  sendTextMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.userId !== process.env.ADMIN_USER_ID) {
        return;
      }
      const contacts = await ctx.prisma.phoneContact.findMany();

      for (const contact of contacts) {
        await sendTextMessage(contact.phoneNumber, input.message);
      }
    }),

  getTextList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.phoneContact.findMany();
  }),

  getTextListInteractions: protectedProcedure.query(async ({ ctx }) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - 7);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0];

    try {
      const [response] = await client.runReport({
        property: env.GOOGLE_ANALYTICS_PROPERTY_ID,
        dateRanges: [{ startDate: dateString, endDate: "today" }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            stringFilter: {
              value: "view_details",
              matchType: "EXACT",
            },
          },
        },
      });

      // rows type is google.analytics.data.v1beta.IRow[]
      return response?.rows?.[0]?.metricValues?.[0]?.value ?? 0;
    } catch (error) {
      console.error("Error fetching Google Analytics data:", error);
    }
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
