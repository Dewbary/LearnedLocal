import * as React from "react";
import { ExperienceInfo } from "../types";

type State = {
  filteredExperiences: ExperienceInfo[];
  setFilteredExperiences: (experiences: ExperienceInfo[]) => void;
};

const initialState: State = {
  filteredExperiences: [],
  setFilteredExperiences: (experiences: ExperienceInfo[]) => {
    return;
  },
};

const FilteredExperiencesContext = React.createContext(initialState);

export default FilteredExperiencesContext;
