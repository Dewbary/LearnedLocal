import { ExperienceInfo } from "packages/db/types/types";
import type {
  CategoryFilter,
  DateFilter,
  DateFilterType,
  DistanceFilter,
} from "../types";

export const dateFilters: DateFilter[] = [
  { name: "Any Day" },
  { name: "Today" },
  { name: "Tomorrow" },
  { name: "This Week" },
  { name: "Next Week" },
  { name: "Past" },
];

export const distanceFilters: DistanceFilter[] = [
  { name: "Any Distance" },
  { name: "5 miles" },
  { name: "10 miles" },
  { name: "25 miles" },
  { name: "50 miles" },
  { name: "100 miles" },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

export const filterExperiences = (
  allExperiences: ExperienceInfo[],
  dateFilter: DateFilter | undefined,
  categoryFilter: CategoryFilter | undefined,
  distanceFilter: DistanceFilter | undefined
): ExperienceInfo[] => {
  const filteredByDate = filterExperiencesByDate(allExperiences, dateFilter);
  const filteredByCategory = filterExperiencesByCategory(
    filteredByDate,
    categoryFilter
  );
  // const filteredByDistance = filterExperiencesByDistance(filteredByCategory, distanceFilter);

  return filteredByCategory;
};

export const filterExperiencesByDate = (
  experiences: ExperienceInfo[],
  filter: DateFilter | undefined
): ExperienceInfo[] => {
  if (!filter) return experiences;

  const dateRange = getDateRangeFromFilter(filter.name);
  if (!dateRange) return experiences;

  if (!dateRange[0]) {
    return experiences.filter((experience) => {
      if (experience.isFutureExperience) return false;
      return experience.availability.every((availableDate) => {
        if (!availableDate.startTime) return false;
        return availableDate.startTime < today;
      });
    });
  }

  return experiences.filter((experience) => {
    return experience.availability.some((availableDate) => {
      if (!availableDate.startTime || !dateRange[0]) return false;
      return (
        availableDate.startTime >= dateRange[0] &&
        availableDate.startTime < dateRange[1]
      );
    });
  });
};

const getDateRangeFromFilter = (
  filter: DateFilterType
): [Date | null, Date] | null => {
  if (filter == "Today") {
    return [today, today];
  }

  if (filter == "Tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return [tomorrow, tomorrow];
  }

  if (filter == "This Week") {
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() + 7);
    thisWeek.setHours(0, 0, 0, 0);
    return [today, thisWeek];
  }

  if (filter == "Next Week") {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    nextWeek.setHours(0, 0, 0, 0);
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    twoWeeks.setHours(0, 0, 0, 0);
    return [nextWeek, twoWeeks];
  }

  if (filter == "Past") {
    const past = new Date();
    past.setDate(past.getDate() - 1);
    past.setHours(0, 0, 0, 0);
    return [null, today];
  }

  return null;
};

export const filterExperiencesByCategory = (
  experiences: ExperienceInfo[],
  filter: CategoryFilter | undefined
): ExperienceInfo[] => {
  if (!filter) return experiences;
  if (filter.name == "Arts & Crafts")
    return experiences.filter((experience) => experience.categoryId == 0);
  if (filter.name == "Food")
    return experiences.filter((experience) => experience.categoryId == 1);
  if (filter.name == "Health & Wellness")
    return experiences.filter((experience) => experience.categoryId == 2);
  if (filter.name == "Outdoors")
    return experiences.filter((experience) => experience.categoryId == 3);
  if (filter.name == "Technology")
    return experiences.filter((experience) => experience.categoryId == 4);
  if (filter.name == "Handy")
    return experiences.filter((experience) => experience.categoryId == 5);
  if (filter.name == "Music")
    return experiences.filter((experience) => experience.categoryId == 6);
  if (filter.name == "Photography")
    return experiences.filter((experience) => experience.categoryId == 7);
  if (filter.name == "Family")
    return experiences.filter((experience) => experience.categoryId == 9);
  if (filter.name == "Entertainment")
    return experiences.filter((experience) => experience.categoryId == 10);
  if (filter.name == "Other")
    return experiences.filter((experience) => experience.categoryId == 11);
  return experiences;
};
