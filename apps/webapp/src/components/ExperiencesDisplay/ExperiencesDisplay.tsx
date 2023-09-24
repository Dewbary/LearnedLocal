import * as React from "react";
import ExperienceCardPlaceholder from "~/components/ExperiencesDisplay/ExperienceCardPlaceholder";
import FilteredExperiencesContext from "../Home/FilteredExperiencesContext";
import ExperienceCard from "../common/ExperienceCard/ExperienceCard";
import styles from "./ExperiencesDisplay.module.css";

const ExperiencesDisplay = () => {
  const { filteredExperiences } = React.useContext(FilteredExperiencesContext);

  return (
    <div>
      <span id="viewexperiences" />

      {/* {isLoading && (
        <div className="mb-10 grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
          <ExperienceCardPlaceholder />
        </div>
      )} */}
      <div className="mx-auto mt-4 mb-4 max-w-2xl px-8 sm:px-4 md:mb-8 md:px-0 lg:max-w-full lg:px-8">
        <div
          className={`grid grid-cols-1 gap-y-10 gap-x-6 ${
            styles.autofit ?? ""
          } xl:gap-x-8`}
        >
          {filteredExperiences &&
            filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesDisplay;
