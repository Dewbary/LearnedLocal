import Link from "next/link";
import React from "react";
import ExperienceCard  from "~/components/FindExperience/ExperienceCard";
import { Experience } from '@prisma/client';
//import SignIn from "~/components/NavBar/SignIn";
import { api } from "~/utils/api";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const HomePage = () => {

  const getExperiences = api.experience.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <SignIn></SignIn>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
      <div className="w-3/4 grid grid-cols-3 justify-items-center gap-y-10">
        {getExperiences.data?.map((experience: Experience) => (
          <div className="">
            <ExperienceCard experience={experience}/>
          </div>
          )
        )}
      </div>
      <div className="dropdown-end dropdown">
        <div>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</div>
      </div>
    </>
  );
};

export default HomePage;
