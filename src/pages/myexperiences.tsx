import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import NavBar from "~/components/NavBar/NavBar";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import Image from "next/image";
import sapiens from "../../public/sapiens.png"
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import GuestListModalHeader from "~/components/FindExperience/GuestListModalHeader";
import GuestListModalBody from "~/components/FindExperience/GuestListModalBody";
import { useRouter } from "next/router";
import { Experience, Registration } from "@prisma/client";
import { useState } from "react";
import CreateExperienceButton from "~/components/CreateExperienceButton";
import Link from "next/link";
import Footer from "~/components/Footer/Footer";
import Head from "next/head";

export default function MyExperiences () {

    const [ showErrorModal, setShowErrorModal ] = useState(false);

    const user = useUser();
    const userCreatedExperiences = api.experience.byUserId.useQuery();
    const userJoinedExperiences = api.experience.getRegistered.useQuery();
    const experienceDeleter = api.experience.delete.useMutation();
    const registrationDeleter = api.registration.removeRegistrant.useMutation();

    const router = useRouter();

    const goToEditPage = async function (experienceSlugId: string, experienceId: number) {
        await router.push(`/experience/create/${experienceSlugId}?experienceId=${experienceId}`);
    }

    const deleteExperience = async function (experience: Experience) {
        if (confirm("Are you sure you want to delete this experience?") === true) {
            experienceDeleter.mutate(experience.id);
            setShowErrorModal(true);
            await userCreatedExperiences.refetch();
            await userJoinedExperiences.refetch();
        }
    }

    const deleteRegistration = function (registration: Registration) {
        if (confirm("Are you sure you want to cancel your registration? You can request a refund from Learned Local.")) {
            registrationDeleter.mutate(registration.id);
            router.reload();
        }
    }

    return (
        <>
            <Head>
                <title>Learned Local</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* NAVBAR */}

            <NavBar isSignedIn={user.isSignedIn ?? false} />

            {/* PAGE BANNER AND TITLE */}

            <div className="grid place-items-center items-end text-primary-content bg-gradient-to-br from-primary to-secondary">
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

            {user.isSignedIn ? (
                <>

                    {/* UPCOMING EXPERIENCES DISPLAY */}

                    <div className="mt-7 px-9 py-3 flex flex-col lg:flex-row gap-5 lg:items-center text-center lg:text-start">
                        <h1 className="text-4xl font-bold">My Upcoming Experiences</h1>
                    </div>
                    {userJoinedExperiences.data?.length === 0 &&
                        <div className="flex flex-col gap-6 py-10 w-full justify-center items-center bg-slate-200 mt-3 px-6">
                            <h1>You&apos;re not currently signed up for any experiences.</h1>
                            <Link href="/#viewexperiences" className="btn">Find an experience</Link>
                        </div>
                    }
                    <div className="grid gap-4 lg:grid-cols-4 p-10">
                        {userJoinedExperiences.data?.map(registration => (
                            <ExperienceCard 
                                key={registration.experience.id}
                                experience={registration.experience}
                                modalButtonText="Details"
                                modalHeaderContent={<ExperienceModalHeader experience={registration.experience} />}
                                modalBodyContent={
                                    <ExperienceModalBody 
                                        experience={registration.experience}
                                        modalActionButton={{
                                            buttonText: "Cancel Registration",
                                            buttonColor: "bg-red-400",
                                            buttonAction: () => deleteRegistration(registration)
                                        }}
                                    /> 
                                } 
                            />
                        ))}
                    </div>

                    {/* HOSTED EXPERIENCES DISPLAY */}

                    <div className="mt-7 px-9 py-3 flex flex-col lg:flex-row gap-5 lg:items-center text-center lg:text-start">
                        <h1 className="text-4xl font-bold">My Hosted Experiences</h1>
                        <CreateExperienceButton />
                    </div>
                    {userCreatedExperiences.data?.length === 0 &&
                        <div className="flex h-24 w-full justify-center items-center bg-slate-200 mt-3">
                            <h1>You&apos;re not currently hosting any experiences.</h1>
                        </div>
                    }
                    <div className="grid lg:grid-cols-4 p-10">
                        {userCreatedExperiences.data?.map(experience => (
                            <ExperienceCard 
                                key={experience.id}
                                experience={experience}
                                actionButtonList={
                                    [
                                        {
                                            buttonText: "Edit",
                                            buttonColor: "bg-blue-400",
                                            buttonAction: () => {void goToEditPage(experience.slugId, experience.id)}
                                        },
                                        {
                                            buttonText: "Delete",
                                            buttonColor: "bg-red-400",
                                            buttonAction: () => {void deleteExperience(experience)}
                                        },
                                    ]
                                }
                                modalButtonText="Manage"
                                modalHeaderContent={<GuestListModalHeader experience={experience} />}
                                modalBodyContent={<GuestListModalBody experience={experience}/>}
                            />
                        ))}
                    </div>

                    {(experienceDeleter.error && showErrorModal) && 
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-5 left-1/3 flex gap-3" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline">You need to remove all guests from this event before deleting it.</span>
                            <button className="" onClick={() => setShowErrorModal(false)}>
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </button>
                      </div>
                    }
                </>
            ) : (
                <div className="my-10 flex justify-center">
                    <h1>Please sign in to see your experiences!</h1>
                </div>
                
            )}

            <Footer />
        </>
    )
}