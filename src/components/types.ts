import { Experience, ExperienceAvailability, Profile } from "@prisma/client";

export type ExperienceInfo = Experience & {
  profile: Profile | null;
  availability: ExperienceAvailability[];
};

export type DateInfo = {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};
