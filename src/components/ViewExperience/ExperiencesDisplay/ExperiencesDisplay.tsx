import * as React from "react";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import ExperienceCardPlaceholder from "~/components/FindExperience/ExperienceCardPlaceholder";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import { ExperienceInfo } from "~/components/types";
import FilteredExperiencesContext from "../FilteredExperiencesContext";

type Props = {
  experiences: ExperienceInfo[];
  isLoading: boolean;
};

const ExperiencesDisplay = ({ experiences, isLoading }: Props) => {
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
          renderExperienceCard(experience, true)
        )}
      </div>
    </div>
  );
};

export default ExperiencesDisplay;

const renderExperienceCard = (
  experience: ExperienceInfo,
  showDetails: boolean
) => {
  if (!experience.isFutureExperience) {
    return (
      <div
        key={experience.id}
        className="card-component my-8 mx-2 flex justify-center"
      >
        <ExperienceCard
          experience={experience}
          hostProfile={experience.profile}
          enableModal={showDetails}
          showDate={showDetails}
          showLocation={showDetails}
          enableFullBanner={showDetails}
          modalButtonText="Details"
          modalHeaderContent={
            <ExperienceModalHeader
              experience={experience}
              hostProfile={experience.profile}
            />
          }
          modalBodyContent={
            <ExperienceModalBody
              experience={experience}
              hostProfile={experience.profile}
              registered={false}
            />
          }
        />
      </div>
    );
  } else {
    return (
      <div
        key={experience.id}
        className="card-component my-8 mx-2 flex justify-center"
      >
        <ExperienceCard
          experience={experience}
          hostProfile={experience.profile}
          enableModal={true}
          showDate={showDetails}
          showLocation={showDetails}
          enableFullBanner={showDetails}
          modalButtonText="Notify Me"
          modalHeaderContent={
            <h2 className="text-3xl font-bold">
              Get Notified for this Experience
            </h2>
          }
          modalBodyContent={
            <iframe
              src={experience.notifyIFrameLink || ""}
              title="Subscription Form"
              className="h-full w-full pr-4"
            />
          }
        />
      </div>
    );
  }
};
