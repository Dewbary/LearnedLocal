import type { ExperienceInfo } from "@learnedlocal/db/types/types";

export const getExperiences = (
  category: string,
  experiences: ExperienceInfo[],
  favorites: number[]
): ExperienceInfo[] => {
  switch (category) {
    case "Favorites":
      return experiences.filter(
        (experience) =>
          favorites.find((id) => experience.id === id) !== undefined
      );
    default:
      return experiences;
  }
};
