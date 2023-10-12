import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { addContactToListWithExperience } from "../utils/sendgrid";

export const emailRouter = createTRPCRouter({
    sendEmailReminders: publicProcedure
      .input(z.object({
        newContactEmail: z.string().min(1),
        experienceTitle: z.string().min(1)
      }))
      .mutation(async ({ctx, input}) => {
        await addContactToListWithExperience(input.newContactEmail, input.experienceTitle);
      })
})