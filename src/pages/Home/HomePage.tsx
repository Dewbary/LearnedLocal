import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const HomePage = () => {
  const user = useUser();
  const uniqueSlug = uuidv4();

  const { data: experiences, isLoading } = api.experience.byUserId.useQuery();

  return (
    <>
      <div>Create a New Experience</div>

      {user.isSignedIn ? (
        <Link href={`/experience/create/${uniqueSlug}`}>
          Create an Experience
        </Link>
      ) : null}
      <div className="dropdown-end dropdown">
        <div>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</div>
      </div>

      <div>
        My Experiences
        {experiences?.map((experience) => {
          return <div key={experience.id}>{experience.title}</div>;
        })}
      </div>
    </>
  );
};

export default HomePage;
