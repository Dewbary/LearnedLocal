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

  return (
    <>
      <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-amber-400" />

      <div className="pt-16 md:pt-0">
        <Header />

        <span id="viewexperiences" />

        <div className="mx-10 my-10 flex flex-col items-center">
          <h2 className="text-5xl font-bold lg:text-7xl">
            Experience Your Community
          </h2>
          <h2 className="mt-6 text-center text-xl lg:mx-24">
            Having a hard time thinking of date night ideas? Looking for fun
            things to do in Utah and Provo? Why not learn a new hobby from a
            talented individual or business right where you live? Come find an
            experience and create a memory with us while building a stronger
            sense of community!
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
                  <ExperienceModalBody
                    experience={experience}
                    registered={false}
                  />
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="mx-24 mb-4 text-center text-3xl lg:text-2xl">
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
            className="fixed m-auto flex h-96 w-full items-center justify-center overflow-x-hidden rounded-xl bg-white p-6 md:h-[700px] md:w-[600px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <iframe
              src="https://cdn.forms-content.sg-form.com/c47b4367-ff5d-11ed-ac99-0292391286ae"
              title="Subscription Form"
              className="h-96 w-96 overflow-x-hidden"
            />
            <button
              onClick={closeModal}
              className="btn-sm btn-circle btn absolute right-2 top-2"
            >
              ✕
            </button>
          </ReactModal>
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-5/6 border-b border-gray-300" />
        </div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <h2 className="text-5xl font-bold lg:text-7xl">
            What is Learned Local?
          </h2>
          <h3 className="mt-6 text-center text-xl lg:mx-24">
            We believe that everyone has hobbies, passions, and interests that
            makes them unique. We made Learned Local as a place for members of
            your community to come together and share these interests with each
            other, in events that we like to call &quot;experiences&quot;. Along
            the way, you&apos;ll forge friendships, create memories, and
            discover that you have a lot more in common with the people around
            you than you think. Sign up for an experience today!
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
