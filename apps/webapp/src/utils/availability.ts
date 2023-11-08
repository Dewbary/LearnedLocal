import { ExperienceAvailability } from "packages/db";

export const sortAvailabilities = (
  availabilities: ExperienceAvailability[]
): ExperienceAvailability[] => {
  return availabilities.sort((a, b) => {
    if (a.startTime && b.startTime) {
      return a.startTime.getTime() - b.startTime.getTime();
    }
    return 0;
  });
};

export const filterAvailabilitiesByDate = (
  availabilities: ExperienceAvailability[]
): ExperienceAvailability[] => {
  return availabilities.filter((availability) => {
    if (availability.startTime) {
      return availability.startTime.getTime() >= new Date().getTime();
    }
    return false;
  });
};
