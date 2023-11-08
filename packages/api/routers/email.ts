import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { addContactToExperienceWaitlist, addContactToListWithExperience } from "../utils/sendgrid";

export const emailRouter = createTRPCRouter({
    sendEmailReminders: publicProcedure
      .input(z.object({
        newContactEmail: z.string().min(1),
        experienceTitle: z.string().min(1)
      }))
      .mutation(async ({input}) => {
        await addContactToListWithExperience(input.newContactEmail, input.experienceTitle);
      }),

    signUpForWaitlist: publicProcedure
      .input(z.object({
        newContactFirstName: z.string().min(1),
        newContactLastName: z.string().min(1),
        newContactEmail: z.string().min(1),
        newContactPhoneNumber: z.string().min(1),
        experienceTitle: z.string().min(1)
      }))
      .mutation(async ({ctx, input}) => {
        await ctx.prisma.waitlistContact.create({
          data: {
            firstName: input.newContactFirstName,
            lastName: input.newContactLastName,
            email: input.newContactEmail,
            phoneNumber: input.newContactPhoneNumber,
            experienceTitle: input.experienceTitle
          }
        });
      })
})