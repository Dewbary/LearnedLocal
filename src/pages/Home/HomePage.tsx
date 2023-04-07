import Link from "next/link";
import React from "react";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import SignIn from "~/components/NavBar/SignIn";
import { api } from "~/utils/api";

const HomePage = () => {

  const getExperiences = api.experience.getAll.useQuery();

  return (
    <>
      <SignIn></SignIn>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
      <div className="w-3/4 grid grid-cols-3 justify-items-center gap-y-10">
        {getExperiences.data?.map((experience) => (
          <div className="">
            <ExperienceCard experience={experience}/>
          </div>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
