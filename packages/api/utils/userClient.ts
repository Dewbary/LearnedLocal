import { User } from "@clerk/nextjs/dist/types/server";
import axios from "axios";
import { ClerkParams } from "../types";

export const getUsers = async (params?: ClerkParams): Promise<User[]> => {
  const response = await axios.get("https://api.clerk.com/v1/users", {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
    params,
  });
  return response.data as User[];
};
