import { User } from "@clerk/nextjs/dist/types/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import * as userClient from "../utils/userClient";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }): Promise<User[]> => {
    return userClient.getUsers();
  }),
  getActiveUsers: protectedProcedure.query(async ({ ctx }): Promise<User[]> => {
    return userClient.getUsers({
      last_active_at_since: getWeekUnixTimestamp(),
    });
  }),
  newSignups: protectedProcedure.query(async ({ ctx }): Promise<User[]> => {
    const users = await clerkClient.users.getUserList();

    const newSignupsPastWeek = users.filter((user) => {
      return user.createdAt > getWeekUnixTimestamp();
    });

    return newSignupsPastWeek;
  }),
});

const getWeekUnixTimestamp = () => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 7);
  date.setUTCHours(0, 0, 0, 0);
  return date.getTime();
};
