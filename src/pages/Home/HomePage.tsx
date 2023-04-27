import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import { Experience } from "@prisma/client";
import { api } from "~/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import Link from "next/link";
import CreateExperienceButton from "~/components/CreateExperienceButton";

const HomePage = () => {
  const user = useUser();
  const experiencesQuery = api.experience.getAll.useQuery();

  return (
    <>
      <NavBar isSignedIn={user.isSignedIn ?? false} />

      <Header />

      <span id="viewexperiences" />

      <div className="mx-10 flex flex-col items-center my-10">
        <h1 className="text-7xl font-bold">Create a Memory</h1>
        <h3 className="text-xl mt-6">Plan a fun activity, discover a new hobby, or forge a friendship with experiences hosted by locals near you.</h3>
      </div>

      {experiencesQuery.data?.length === 0 &&
        <div className="bg-slate-200 py-10 flex items-center justify-center">
          <p>There are currently no experiences hosted in your area. Why not host one yourself?</p>
        </div>
      }


      <div className="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
        {experiencesQuery.data?.map((experience: Experience) => (
          <div key={experience.id} className="card-component my-8 flex justify-center">
            <ExperienceCard 
              experience={experience}
              modalButtonText="Details"
              modalHeaderContent={<ExperienceModalHeader experience={experience} />}
              modalBodyContent={<ExperienceModalBody experience={experience} />}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-1 w-5/6 border-b border-gray-300" />
      </div>

      <span id="hostexperience" />
      <div className="mx-10 flex flex-col items-center my-10">
        <h1 className="text-7xl font-bold">Become a Local</h1>
        <h3 className="text-xl my-6">Want to host an experience? Sign up to start sharing your passion with others.</h3>
        {user.isSignedIn ? (
          <CreateExperienceButton />
        ) : (
        <button className="btn-primary btn mt-6">
          <SignInButton />
        </button>
        )}
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
