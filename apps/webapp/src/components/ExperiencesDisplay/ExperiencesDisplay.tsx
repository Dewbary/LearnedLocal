import * as React from "react";
import ExperienceCardPlaceholder from "~/components/ExperiencesDisplay/ExperienceCardPlaceholder";
import { ExperienceInfo } from "~/components/types";
import FilteredExperiencesContext from "../Home/FilteredExperiencesContext";
import ExperienceCard from "../common/ExperienceCard/ExperienceCard";
import CustomModal from "../common/CustomModal/CustomModal";
import ExperienceDetailModalContents from "../common/ExperienceDetailModalContents";
import ExperienceSubscribeModalContents from "../common/ExperienceSubscribeModalContents";

type Props = {
  isLoading: boolean;
};

const ExperiencesDisplay = ({ isLoading }: Props) => {
  const { filteredExperiences } = React.useContext(FilteredExperiencesContext);

  return (
    <div className="">
      <span id="viewexperiences" />

      {isLoading && (
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
      )}
      <div className="mb-10 grid grid-cols-1 justify-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredExperiences.map((experience) =>
          renderExperienceCard(experience)
        )}
      </div>
    </div>
  );
};

export default ExperiencesDisplay;

const renderExperienceCard = function (experience: ExperienceInfo) {

  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to the start of the day

  const experienceIsCurrent = !experience.isFutureExperience &&
    experience.availability.some((date) => {
      if (!date.date) return false;
      return date.date >= today;
    });

  return (
    <div key={experience.id} className="card-component my-8 mx-2 flex justify-center">
      <ExperienceCard 
        experienceInfo={experience} 
        showDateAndLocation={experienceIsCurrent}
        onClickModal={
          <CustomModal
            button={<button className="absolute w-full h-full z-10 hover:bg-black hover:bg-opacity-25"></button>}
          >
            {experienceIsCurrent ? 
              (
                <ExperienceDetailModalContents 
                  experienceInfo={experience} 
                  showRegisteredDetails={false} 
                />
              ) : (
                <ExperienceSubscribeModalContents
                  experienceInfo={experience}
                />
              )
            }
            
          </CustomModal>
        }
      >
      </ExperienceCard>
    </div>
  )
}