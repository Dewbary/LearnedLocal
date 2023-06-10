import { Experience } from "@prisma/client";
import * as React from "react";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";

type Props = {
  experiences: Experience[];
};

const ExperiencesDisplay = ({ experiences }: Props) => {
  return (
    <>
      <span id="viewexperiences" />

      <div className="mx-10 my-10 flex flex-col items-center">
        <h2 className="text-5xl font-bold lg:text-7xl">
          Experience Your Community
        </h2>
        <h2 className="mt-6 text-center text-xl lg:mx-24">
          Having a hard time thinking of date night ideas? Looking for fun
          things to do in Utah and Provo? Why not learn a new hobby from a
          talented individual or business right where you live? Come find an
          experience and create a memory with us while building a stronger sense
          of community!
        </h2>
      </div>

      {experiences.length === 0 && (
        <div className="flex items-center justify-center bg-slate-200 py-10">
          <p>
            There are currently no experiences hosted in your area. Why not host
            one yourself?
          </p>
        </div>
      )}

      <div className="mb-20 grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentExperiences.map(
          (experience: Experience & { profile: Profile | null }) =>
            renderExperienceCard(experience, true)
        )}
        {currentExperiences.length > 0 && (
          <div className="col-span-1 flex flex-col justify-center md:col-span-3 lg:col-span-4">
            <div className="h-1 border-b border-gray-300" />
            <div className="my-4 text-center text-3xl font-bold">
              Coming Soon
            </div>
          </div>
        )}
        {upcomingExperiences.map(
          (experience: Experience & { profile: Profile | null }) =>
            renderExperienceCard(experience, false)
        )}
        {currentExperiences.length > 0 && (
          <div className="col-span-1 flex flex-col justify-center md:col-span-3 lg:col-span-4">
            <div className="h-1 border-b border-gray-300" />
            <div className="my-4 text-center text-3xl font-bold">
              Past Experiences
            </div>
          </div>
        )}
        {pastExperiences.map(
          (experience: Experience & { profile: Profile | null }) =>
            renderExperienceCard(experience, false)
        )}
      </div>
    </>
  );
};

export default ExperiencesDisplay;

const renderExperienceCard = (
  experience: Experience & {
    profile: Profile | null;
  },
  showDetails: boolean
) => (
  <div key={experience.id} className="card-component my-8 flex justify-center">
    <ExperienceCard
      experience={experience}
      hostProfile={experience.profile}
      showDetails={showDetails}
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
