import { Experience, Profile } from "@prisma/client";

export type ExperienceInfo = Experience & {
  profile: Profile | null;
};
