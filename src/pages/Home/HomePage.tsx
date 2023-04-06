import Link from "next/link";
import React from "react";
import SignIn from "~/components/NavBar/SignIn";
import { api } from "~/utils/api";

const HomePage = () => {

  const getExperiences = api.experience.getAll.useQuery();

  return (
    <>
      <SignIn></SignIn>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
      <div>
        {getExperiences.data?.map((experience) => (
            <div>
              {experience.title} for the low low price of {experience.price}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
