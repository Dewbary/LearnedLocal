import * as React from "react";
import { ExperienceInfo } from "../types";

type State = {
  filteredExperiences: ExperienceInfo[];
  setFilteredExperiences: (experiences: ExperienceInfo[]) => void;
};

const initialState: State = {
  filteredExperiences: [],
  setFilteredExperiences: () => {},
};

const FilteredExperiencesContext = React.createContext(initialState);

export default FilteredExperiencesContext;
