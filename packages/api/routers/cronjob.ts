import {
  Experience,
  ExperienceAvailability,
  Registration,
} from "@prisma/client";
import { add, startOfToday } from "date-fns";
import { z } from "zod";
import { env } from "@learnedlocal/config/env.mjs";

import { createTRPCRouter, publicProcedure } from "../trpc";
import prisma from "../db";
import sendTextMessage from "../utils/twilio";

type AvailabilityWithRegistrations = ExperienceAvailability & {
  registrations: Registration[];
  experience: Experience;
};

export const cronJobRouter = createTRPCRouter({
  sendTextReminders: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ input }) => {
      try {
        if (input === process.env.EDGE_FUNCTION_VERIFICATION_TOKEN) {
          const availabilities = await prisma.experienceAvailability.findMany({
            where: {
              startTime: {
                gte: startOfToday(),
              },
            },
            include: {
              registrations: true,
              experience: true,
            },
          });

          availabilities.forEach((availability) => {
            if (availability.startTime !== null) {
              // The availability is scheduled for today
              if (dateIsXDaysOut(availability.startTime, 0)) {
                sendDayRemindersToRegistrations(availability, "today");
              }

              // The availability is scheduled for 3 days out
              else if (dateIsXDaysOut(availability.startTime, 3)) {
                sendDayRemindersToRegistrations(
                  availability,
                  "3 days from today"
                );
              }

              // The availability is scheduled for 7 days out
              else if (dateIsXDaysOut(availability.startTime, 7)) {
                sendDayRemindersToRegistrations(
                  availability,
                  "a week from today"
                );
              }
            }
          });
        } else {
          throw "Unauthorized token";
        }
      } catch (e) {
        console.log(e);
      }
    }),
});

function dateIsXDaysOut(date: Date, daysOut: number) {
  return (
    date >= add(startOfToday(), { days: daysOut }) &&
    date <= add(startOfToday(), { days: daysOut + 1 })
  );
}

function sendDayRemindersToRegistrations(
  availability: AvailabilityWithRegistrations,
  daysOutString: string
) {
  availability.registrations.forEach(async (registration) => {
    if (registration.textNotificationsEnabled) {
      const reminderMessage = `Hello ${registration.registrantFirstName}, this is a reminder that the experience you signed up for, ${availability.experience.title}, is ${daysOutString}! See details about your experience at learnedlocal.app`;
      await sendTextMessage(registration.phone, reminderMessage);
    }
  });
}
