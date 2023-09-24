import { ExperienceInfo, SerializedExperienceInfo } from "~/components/types";

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
          date: availability.date ? new Date(availability.date) : null,
          startTime: availability.startTime
            ? new Date(availability.startTime)
            : null,
          endTime: availability.endTime ? new Date(availability.endTime) : null,
        };
      }),
    };
  });
};
