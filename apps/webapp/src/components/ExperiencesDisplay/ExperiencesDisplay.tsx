import * as React from "react";
import FilteredExperiencesContext from "../Home/FilteredExperiencesContext";
import ExperienceCard from "../common/ExperienceCard/ExperienceCard";
import styles from "./ExperiencesDisplay.module.css";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";

const ExperiencesDisplay = () => {
  const { filteredExperiences } = React.useContext(FilteredExperiencesContext);

  if (filteredExperiences.length > 4) {
    return (
      <>
        <span id="viewexperiences" />
        <div
          className={`grid grid-cols-1 gap-x-6 gap-y-10  ${
            styles.autofit ?? ""
          } xl:gap-x-8`}
        >
          {filteredExperiences &&
            filteredExperiences.map((experience: ExperienceInfo) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isHomePageCard={true}
              />
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <span id="viewexperiences" />
      <div
        className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8`}
      >
        {filteredExperiences &&
          filteredExperiences.map((experience: ExperienceInfo) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isHomePageCard={true}
            />
          ))}
      </div>
    </>
  );
};

export default ExperiencesDisplay;
