import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  addContactToExperienceWaitlist,
  addContactToListWithExperience,
  sendExperienceRequestEmail,
} from "../utils/sendgrid";

export const emailRouter = createTRPCRouter({
  sendEmailReminders: publicProcedure
    .input(
      z.object({
        newContactEmail: z.string().min(1),
        experienceTitle: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      await addContactToListWithExperience(
        input.newContactEmail,
        input.experienceTitle
      );
    }),

  sendTimeRequestEmail: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        customerEmail: z.string(),
        hostEmail: z.string(),
        experienceTitle: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      await sendExperienceRequestEmail(
        input.date,
        input.customerName,
        input.customerEmail,
        input.experienceTitle,
        input.hostEmail
      );
    }),

  signUpForWaitlist: publicProcedure
    .input(
      z.object({
        newContactFirstName: z.string().min(1),
        newContactLastName: z.string().min(1),
        newContactEmail: z.string().min(1),
        newContactPhoneNumber: z.string().min(1),
        experienceTitle: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.waitlistContact.create({
        data: {
          firstName: input.newContactFirstName,
          lastName: input.newContactLastName,
          email: input.newContactEmail,
          phoneNumber: input.newContactPhoneNumber,
          experienceTitle: input.experienceTitle,
        },
      });
    }),
});
