import Link from "next/link";
import React from "react";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import { Experience } from "@prisma/client";
//import SignIn from "~/components/NavBar/SignIn";
import { api } from "~/utils/api";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const getExperiences = api.experience.getAll.useQuery();
  const user = useUser();
  const uniqueSlug = uuidv4();

  const { data: experiences, isLoading } = api.experience.byUserId.useQuery();

  return (
    <>
      <SignIn></SignIn>
      <div>Create a New Experience</div>
      {user.isSignedIn ? (
        <Link href={`/experience/create/${uniqueSlug}`}>
          Create an Experience
        </Link>
      ) : null}
      <div>
        My Experiences
        {experiences?.map((experience) => {
          return <div key={experience.id}>{experience.title}</div>;
        })}
      </div>
      <div className="grid w-3/4 grid-cols-3 justify-items-center gap-y-10">
        {getExperiences.data?.map((experience: Experience) => (
          <div className="">
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
      <div className="dropdown-end dropdown">
        <div>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</div>
      </div>
    </>
  );
};

export default HomePage;
