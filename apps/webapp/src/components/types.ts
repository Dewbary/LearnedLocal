import { Experience, ExperienceAvailability, Profile } from "@learnedlocal/db";

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

export type DateInfo = {
  id?: number;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};

type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export type SerializedExperienceInfo = SerializedExperience & {
  profile: Profile | null;
  availability: SerializedExperienceAvailability[];
};

type SerializedExperience = ReplaceDateWithString<Experience>;
type SerializedExperienceAvailability =
  ReplaceDateWithString<ExperienceAvailability>;
