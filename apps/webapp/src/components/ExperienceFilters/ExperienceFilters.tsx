import * as React from "react";
import ExpFilterBtn from "./ExpFilterBtn";
import ResetFiltersBtn from "./ResetFiltersBtn";

const ExperienceFilters = () => {
  return (
    <div className="flex flex-wrap content-center items-center gap-4 pr-4">
      <ExpFilterBtn text="Any Day" />
      <ExpFilterBtn text="Any Category" />
      <ExpFilterBtn text="Any Distance" />
      <ResetFiltersBtn />
    </div>
  );
};

export default ExperienceFilters;
