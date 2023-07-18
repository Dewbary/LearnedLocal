import { Experience, ExperienceAvailability, Profile } from "@prisma/client";

export type ExperienceInfo = Experience & {
  profile: Profile | null;
  availability: ExperienceAvailability[];
};
