import type {
  Experience,
  ExperienceAvailability,
  Profile,
} from "@prisma/client";

export type ExperienceInfo = Experience & {
  profile: Profile | null;
  availability: ExperienceAvailability[];
};

export type AvailabilityInfo =
  | (ExperienceAvailability & {
      experience: Experience & {
        profile: Profile | null;
      };
    })
  | null;

export type Pin = {
  lat: number;
  lng: number;
};
