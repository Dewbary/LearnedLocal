import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import NavBar from "~/components/NavBar/NavBar";
import { useRouter } from "next/router";
import { Experience, Registration } from "@learnedlocal/db";
import { useState } from "react";
import CreateExperienceButton from "~/components/common/CreateExperienceButton";
import Link from "next/link";
import Footer from "~/components/Footer/Footer";
import Head from "next/head";
import ExperienceCard from "~/components/common/ExperienceCard";
import CustomModal from "~/components/common/CustomModal";
import GuestListModalContents from "~/components/common/GuestListModalContents";
import Image from "next/image";
import sapiens from "../../public/sapiens.png";
import styles from "../../components/ExperiencesDisplay/ExperiencesDisplay.module.css";

export default function MyExperiences() {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const user = useUser();
  const userCreatedExperiences = api.experience.byUserId.useQuery();
  const userJoinedExperiences = api.experience.getRegistered.useQuery();
  const experienceDeleter = api.experience.delete.useMutation();
  const registrationDeleter = api.registration.removeRegistrant.useMutation();

  const router = useRouter();

  const goToEditPage = async function (
    experienceSlugId: string,
    experienceId: number
  ) {
    await router.push(
      `/experience/create/${experienceSlugId}?experienceId=${experienceId}`
    );
  };

  const goToExperienceView = async function (experienceId: number) {
    await router.push(`/experience/view/${experienceId}`);
  };

  const deleteExperience = function (experience: Experience) {
    if (confirm("Are you sure you want to delete this experience?") === true) {
      experienceDeleter.mutate(experience.id);
      setShowErrorModal(true);
      router.reload();
    }
  };

  const deleteRegistration = function (registration: Registration) {
    if (
      confirm(
        "Are you sure you want to cancel your registration? You can request a refund from Learned Local."
      )
    ) {
      registrationDeleter.mutate(registration.id);
      router.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Learned Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAVBAR */}

      <NavBar
        isSignedIn={user.isSignedIn ?? false}
        className="bg-white drop-shadow-lg lg:bg-opacity-0 lg:drop-shadow-none"
      />

      {/* PAGE BANNER AND TITLE */}

      <div className="grid place-items-center items-end bg-gradient-to-br from-amber-300 to-amber-500 pt-10 text-gray-800 lg:pt-0">
        <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between lg:flex-row lg:gap-0 xl:gap-20">
          <div className="flex-1">
            <Image
              className="w-full object-cover"
              src={sapiens}
              alt="experience"
            />
          </div>
          <div className="lg:pr-48">
            <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
              <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                My Experiences
              </h1>
              <h2 className="font-title text-lg sm:text-xl lg:text-2xl">
                View your joined experiences and manage your hosted experiences
              </h2>
            </div>
            <div className="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
              <div className="my-2 flex max-w-sm flex-col gap-2 text-left"></div>
            </div>
          </div>
        </div>
      </div>

      <SignedIn>
        {/* UPCOMING EXPERIENCES DISPLAY */}

        <div className="mt-7 flex flex-col gap-5 px-9 py-3 text-center lg:flex-row lg:items-center lg:text-start">
          <h1 className="text-4xl font-bold">My Upcoming Experiences</h1>
        </div>
        {userJoinedExperiences.data?.length === 0 && (
          <div className="mt-3 flex w-full flex-col items-center justify-center gap-6 bg-slate-200 py-10 px-6">
            <h1>You&apos;re not currently signed up for any experiences.</h1>
            <Link href="/#viewexperiences" className="btn">
              Find an experience
            </Link>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-y-10 gap-x-6 ${
            styles.autofit ?? ""
          } xl:gap-x-8`}
        >
          {userJoinedExperiences.data?.map((registration) => (
            <ExperienceCard
              key={registration.experience.id}
              experience={registration.experience}
              registered={true}
              isHomePageCard={false}
            >
              <button
                onClick={() => deleteRegistration(registration)}
                className="z-20 rounded-lg bg-red-400 p-2 text-white drop-shadow-md hover:bg-red-500"
              >
                Cancel Reservation
              </button>
            </ExperienceCard>
          ))}
        </div>

        {/* HOSTED EXPERIENCES DISPLAY */}

        <div className="mt-7 flex flex-col gap-5 px-9 py-3 text-center lg:flex-row lg:items-center lg:text-start">
          <h1 className="text-4xl font-bold">My Hosted Experiences</h1>
          <CreateExperienceButton />
        </div>
        {userCreatedExperiences.data?.length === 0 && (
          <div className="mt-3 flex h-24 w-full items-center justify-center bg-slate-200">
            <h1>You&apos;re not currently hosting any experiences.</h1>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-y-10 gap-x-6 m-10 ${
            styles.autofit ?? ""
          } xl:gap-x-8`}
        >
          {userCreatedExperiences.data?.map((experience) => (
            <>
              <ExperienceCard experience={experience} registered={false} isHomePageCard={false}>
                <CustomModal
                  button={
                    <button className="z-20 rounded-lg bg-green-400 p-2 text-white drop-shadow-md hover:bg-green-500">
                      Guests
                    </button>
                  }
                >
                  <GuestListModalContents experienceInfo={experience} />
                </CustomModal>

                <button
                  onClick={() => goToExperienceView(experience.id)}
                  className="z-20 rounded-lg bg-amber-400 p-2 text-white drop-shadow-md hover:bg-amber-500"
                >
                  View
                </button>
                <button
                  onClick={() => goToEditPage(experience.slugId, experience.id)}
                  className="z-20 rounded-lg bg-blue-400 p-2 text-white drop-shadow-md hover:bg-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExperience(experience)}
                  className="z-20 rounded-lg bg-red-400 p-2 text-white drop-shadow-md hover:bg-red-500"
                >
                  Delete
                </button>
              </ExperienceCard>
            </>
          ))}
        </div>

        {experienceDeleter.error && showErrorModal && (
          <div
            className="fixed bottom-5 left-1/3 flex gap-3 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              You need to remove all guests from this event before deleting it.
            </span>
            <button className="" onClick={() => setShowErrorModal(false)}>
              <svg
                className="h-6 w-6 fill-current text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <Footer />
    </>
  );
}
