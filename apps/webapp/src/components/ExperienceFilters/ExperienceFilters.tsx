import * as React from "react";
import ExpFilterBtn from "./ExpFilterBtn";
import ResetFiltersBtn from "./ResetFiltersBtn";
import { api } from "~/utils/api";
import FilteredExperiencesContext from "../Home/FilteredExperiencesContext";
import {
  dateFilters,
  distanceFilters,
  filterExperiences,
} from "./ExperienceFiltersUtils";
import type {
  CategoryFilter,
  CategoryName,
  DateFilter,
  DistanceFilter,
} from "../types";

const ExperienceFilters = () => {
  const { allExperiences, setFilteredExperiences } =
    React.useContext(FilteredExperiencesContext);

  const categories = api.category.getAll.useQuery();

  const categoryFilters: CategoryFilter[] = [
    { name: "Any Category" },
    ...(categories.data?.map((category) => ({
      name: category.name as CategoryName,
    })) || []),
  ];

  const [dateFilter, setDateFilter] = React.useState<DateFilter | undefined>(
    dateFilters[0]
  );

  const [categoryFilter, setCategoryFilter] = React.useState<
    CategoryFilter | undefined
  >(categoryFilters[0]);

  const [distanceFilter, setDistanceFilter] = React.useState<
    DistanceFilter | undefined
  >(distanceFilters[0]);

  const handleSelectDateFilter = (filter: DateFilter) => {
    setDateFilter(filter);
    setFilteredExperiences(
      filterExperiences(allExperiences, filter, categoryFilter, distanceFilter)
    );
  };

  const handleSelectCategoryFilter = (filter: CategoryFilter) => {
    setCategoryFilter(filter);
    setFilteredExperiences(
      filterExperiences(allExperiences, dateFilter, filter, distanceFilter)
    );
  };

  // const handleSelectDistanceFilter = (filter: DistanceFilter) => {};

  const handleResetFilters = () => {
    setDateFilter(dateFilters[0]);
    setCategoryFilter(categoryFilters[0]);
    setDistanceFilter(distanceFilters[0]);
    setFilteredExperiences(allExperiences);
  };

  return (
    <div className="flex flex-wrap content-center items-center gap-4 pr-4">
      <ExpFilterBtn
        selectedFilter={dateFilter}
        filters={dateFilters}
        onFilterSelect={handleSelectDateFilter}
      />
      <ExpFilterBtn
        selectedFilter={categoryFilter}
        filters={categoryFilters}
        onFilterSelect={handleSelectCategoryFilter}
      />
      {/* TODO: Implement Distance Filters when we expand outside of Provo */}
      {/* <ExpFilterBtn
        selectedFilter={distanceFilter}
        filters={distanceFilters}
        onFilterSelect={handleSelectDistanceFilter}
      /> */}
      <ResetFiltersBtn onResetFilters={handleResetFilters} />
    </div>
  );
};

export default ExperienceFilters;
