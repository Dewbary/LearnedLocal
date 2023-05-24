import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import { Experience } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import { useRouter } from "next/router";

const HomePage = () => {
  const user = useUser();
  const experiencesQuery = api.experience.getAll.useQuery();

  const router = useRouter();
  
  const navigateToHosting = async function () {
    await router.push("/host");
  }

  return (
    <>
      <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-amber-400" />

      <div className="pt-16 md:pt-0">
        <Header />

        <span id="viewexperiences" />

        <div className="mx-10 my-10 flex flex-col items-center">
          <h2 className="text-5xl lg:text-7xl font-bold">Experience Your Community</h2>
          <h2 className="mt-6 text-xl lg:mx-10">
            Having a hard time thinking of date night ideas? Looking for fun things to do in Utah and Provo? Why not learn a new hobby from a talented individual or business right where you live? Come find an experience and create a memory with us while building a stronger sense of community!
          </h2>
        </div>

        {experiencesQuery.data?.length === 0 && (
          <div className="flex items-center justify-center bg-slate-200 py-10">
            <p>
              There are currently no experiences hosted in your area. Why not
              host one yourself?
            </p>
          </div>
        )}

        <div className="mb-20 grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {experiencesQuery.data?.map((experience: Experience) => (
            <div
              key={experience.id}
              className="card-component my-8 flex justify-center"
            >
              <ExperienceCard
                experience={experience}
                modalButtonText="Details"
                modalHeaderContent={
                  <ExperienceModalHeader experience={experience} />
                }
                modalBodyContent={
                  <ExperienceModalBody experience={experience} />
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <h2 className="text-5xl lg:text-7xl font-bold">What is Learned Local?</h2>
          <h3 className="mt-6 text-xl lg:mx-10">
            We believe that everyone has hobbies, passions, and interests that makes them unique. We made Learned Local as a place for members of your community to come together and share these interests with each other, in events that we like to call &quot;experiences&quot;. Along the way, you&apos;ll forge friendships, create memories, and discover that you have a lot more in common with the people around you than you think. Sign up for an experience today!
          </h3>
          <video
            src="/learnedlocalvid.mp4"
            controls
            className="pt-8 md:pl-16 md:pr-16 md:pt-8 md:pb-8 lg:pl-48 lg:pr-48 lg:pt-16 lg:pb-16"
          />
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <span id="hostexperience" />
          <h2 className="text-5xl lg:text-7xl font-bold">Become a Local</h2>
          <h3 className="my-6 text-xl">
            Want to host an experience? Sign up to start sharing your passion
            with others.
          </h3>
          <button className="btn-primary btn" onClick={() => navigateToHosting()}>Learn More</button>
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
