import { Experience, ExperienceAvailability, Profile } from "@prisma/client";

export type ExperienceInfo = Experience & {
  profile: Profile | null;
  availability: ExperienceAvailability[];
};

export type DateInfo = {
  id?: number;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};
