import * as React from "react";
import FilteredExperiencesContext from "../Home/FilteredExperiencesContext";
import ExperienceCard from "../common/ExperienceCard/ExperienceCard";
import styles from "./ExperiencesDisplay.module.css";

const ExperiencesDisplay = () => {
  const { filteredExperiences } = React.useContext(FilteredExperiencesContext);

  return (
    <div>
      <span id="viewexperiences" />
      <div className="mx-auto mt-4 mb-4 max-w-2xl px-8 sm:px-4 md:mb-8 md:px-0 lg:max-w-full lg:px-8">
        <div
          className={`grid grid-cols-1 gap-y-10 gap-x-6 ${
            filteredExperiences.length > 3
              ? styles.autofit ?? ""
              : styles.autofitSmaller ?? ""
          } xl:gap-x-8`}
        >
          {filteredExperiences &&
            filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isHomePageCard={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesDisplay;
