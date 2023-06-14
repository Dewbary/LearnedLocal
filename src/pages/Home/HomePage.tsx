import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import { Experience, Profile, Registration } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useState } from "react";
import ReactModal from "react-modal";

Modal.setAppElement("#__next");

const HomePage = () => {
  const user = useUser();
  const experiencesQuery = api.experience.getAll.useQuery();

  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigateToHosting = async function () {
    await router.push("/host");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to the start of the day

  const currentExperiences =
    experiencesQuery.data
      ?.filter((experience) => new Date(experience.date) >= today)
      .filter((experience) => !experience.isFutureExperience) ||
    [];

  const upcomingExperiences =
    experiencesQuery.data?.filter((experience) =>
      experience.isFutureExperience
    ) || [];

  const pastExperiences =
    experiencesQuery.data?.filter(
      (experience) =>
        new Date(experience.date) < today &&
        !experience.isFutureExperience
    ) || [];

  return (
    <>
      <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-white drop-shadow-lg"/>

      <div className="pt-16 md:pt-0">
        <Header />

        <span id="viewexperiences" />

        {/* <div className="mx-10 my-10 flex flex-col items-center">
          <h2 className="text-5xl font-bold lg:text-7xl">
            Experience Community
          </h2>
          <h2 className="mt-6 text-center text-xl lg:mx-24">
            Having a hard time thinking of date night ideas? Looking for fun
            things to do in Utah and Provo? Why not learn a new hobby from a
            talented individual or business right where you live? Come find an
            experience and create a memory with us while building a stronger
            sense of community!
          </h2>
        </div> */}

        <div>
          <div className="mt-4 text-center text-3xl font-bold">
            <h2>Available Experiences</h2>
          </div>
        </div>

        {experiencesQuery.data?.length === 0 && (
          <div className="flex items-center justify-center bg-slate-200 py-10">
            <p>
              There are currently no experiences hosted in your area. Why not
              host one yourself?
            </p>
          </div>
        )}

        <div className="mb-10 grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentExperiences.map(
            (experience) =>
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
            (experience) =>
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
            (experience) =>
              renderExperienceCard(experience, false)
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-center text-2xl lg:text-2xl">
            Not seeing an experience? Get notified when there are new
            experiences in your area!
          </p>

          <button
            onClick={openModal}
            className="btn-outline btn-ghost btn mb-8"
          >
            Subscribe For Experience Updates
          </button>
          <ReactModal
            isOpen={modalIsOpen}
            contentLabel="Minimal Modal Example"
            className="fixed flex items-center justify-center rounded-xl bg-white w-full lg:w-1/2 h-3/4 lg:h-5/6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <iframe
              src="https://cdn.forms-content.sg-form.com/c47b4367-ff5d-11ed-ac99-0292391286ae"
              title="Subscription Form"
              className="w-full h-full pr-4"
            />
            <button
              onClick={closeModal}
              className="btn-md btn-circle btn absolute right-8 lg:right-2 top-2 z-50"
            >
              ✕
            </button>
          </ReactModal>
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <span id="aboutlearnedlocal" />
          <h2 className="text-4xl font-bold lg:text-7xl text-center">
            What is Learned Local?
          </h2>
          <p className="mt-6 text-left text-xl lg:mx-24">
            Having a hard time thinking of date night ideas? Looking for fun
            things to do in Utah and Provo? Why not learn a new hobby from a
            talented individual or business right where you live? Come find an
            experience and create a memory with us while building a stronger
            sense of community!
          </p>
          <p className="mt-6 text-left text-xl lg:mx-24">
            We believe that everyone has hobbies, passions, and interests that
            makes them unique. We made Learned Local as a place for members of
            your community to come together and share these interests with each
            other, in events that we like to call &quot;experiences&quot;. Along
            the way, you&apos;ll forge friendships, create memories, and
            discover that you have a lot more in common with the people around
            you than you think. Sign up for an experience today!
          </p>
          <div className="mt-10 w-full lg:px-72">
            <div className="w-full aspect-w-16 aspect-h-9">
              <iframe src="https://www.youtube.com/embed/leKfHxT_6II" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
          
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <span id="hostexperience" />
          <h2 className="text-5xl font-bold lg:text-7xl">Become a Local</h2>
          <h3 className="my-6 text-xl">
            Want to host an experience? Sign up to start sharing your passion
            with others.
          </h3>
          <button
            className="btn-primary btn"
            onClick={() => navigateToHosting()}
          >
            Learn More
          </button>
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

const renderExperienceCard = (
  experience: Experience & {
    profile: Profile | null;
  },
  showDetails: boolean
) => {
  if (!experience.isFutureExperience) {
      return (
        <div key={experience.id} className="card-component my-8 flex justify-center">
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
    )
  }
  else {
    return (
      <div key={experience.id} className="card-component my-8 flex justify-center">
        <ExperienceCard
          experience={experience}
          hostProfile={experience.profile}
          enableModal={true}
          showDate={showDetails}
          showLocation={showDetails}
          enableFullBanner={showDetails}
          modalButtonText="Notify Me"
          modalHeaderContent={
            <h2 className="text-3xl font-bold">Get Notified for this Experience</h2>
          }
          modalBodyContent={
            <iframe
              src={experience.notifyIFrameLink || ""}
              title="Subscription Form"
              className="w-full h-full pr-4"
            />
          }
        />
      </div>
    )
  }
  
}