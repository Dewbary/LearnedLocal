import type { SerializedExperienceInfo } from "~/components/types";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";

export const deserialize = (
  experiences: SerializedExperienceInfo[]
): ExperienceInfo[] => {
  return experiences.map((experience) => {
    return {
      ...experience,
      createdAt: new Date(experience.createdAt),
      updatedAt: new Date(experience.updatedAt),
      availability: experience.availability.map((availability) => {
        return {
          ...availability,
          startTime: availability.startTime
            ? new Date(availability.startTime)
            : null,
          endTime: availability.endTime ? new Date(availability.endTime) : null,
        };
      }),
    };
  });
};
