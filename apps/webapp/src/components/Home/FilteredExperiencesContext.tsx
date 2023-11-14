import * as React from "react";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";

type State = {
  filteredExperiences: ExperienceInfo[];
  allExperiences: ExperienceInfo[];
  setFilteredExperiences: (experiences: ExperienceInfo[]) => void;
};

const initialState: State = {
  filteredExperiences: [],
  allExperiences: [],
  setFilteredExperiences: (experiences: ExperienceInfo[]) => {
    return;
  },
};

const FilteredExperiencesContext = React.createContext(initialState);

export default FilteredExperiencesContext;
