import { ExperienceInfo } from "../types";

const today = new Date();
today.setHours(0, 0, 0, 0); // set to the start of the day

export const getExperiences = (
  category: string,
  experiences: ExperienceInfo[]
): ExperienceInfo[] => {
  switch (category) {
    case "Current":
      return experiences.filter((experience) =>
        experience.availability.some((availableDate) => {
          if (!availableDate.date) return false;
          return availableDate?.date >= today;
        })
      );
    case "Upcoming":
      return (
        experiences.filter((experience) => experience.isFutureExperience) || []
      );

    case "Past":
      return experiences.filter((experience) =>
      {
        if (experience.isFutureExperience) return false;
        return experience.availability.every((availableDate) => {
          if (!availableDate.date) return false;
          return availableDate.date < today;
        })
      }
      );
    case "Outdoors":
      return experiences.filter((experience) => experience.categoryId === 3);
    case "Culinary":
      return experiences.filter((experience) => experience.categoryId === 1);
    case "Art":
      return experiences.filter((experience) => experience.categoryId === 0);
    case "Sports":
      return experiences.filter((experience) => experience.categoryId === 2);
    case "All":
      return experiences;
    default:
      return experiences;
  }
};
