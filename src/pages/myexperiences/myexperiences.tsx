import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import NavBar from "~/components/NavBar/NavBar";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import Image from "next/image";
import sapiens from "../../../public/sapiens.png"
import ExperienceModalHeader from "~/components/FindExperience/ExperienceModalHeader";
import ExperienceModalBody from "~/components/FindExperience/ExperienceModalBody";
import GuestListModalHeader from "~/components/FindExperience/GuestListModalHeader";
import GuestListModalBody from "~/components/FindExperience/GuestListModalBody";

export default function MyExperiences () {

    const user = useUser();
    const userCreatedExperiences = api.experience.byUserId.useQuery();
    const userJoinedExperiences = api.experience.getAll.useQuery();

    return (
        <>

            {/* NAVBAR */}

            <NavBar isSignedIn={user.isSignedIn ?? false} />

            {/* PAGE BANNER AND TITLE */}

            <div className="grid place-items-center items-end text-primary-content bg-gradient-to-br from-primary to-secondary">
                <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-0 xl:gap-20">
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

                    <div className="mt-7 pl-9 py-3">
                        <h1 className="text-4xl font-bold">My Upcoming Experiences</h1>
                    </div>
                    <div className="grid lg:grid-cols-4 p-10">
                        {userJoinedExperiences.data?.map(experience => (
                            <ExperienceCard experienceCardProps={
                                {
                                    experience: experience,
                                    modalButtonText: "Details",
                                    modalHeaderContent: <ExperienceModalHeader experience={experience} />,
                                    modalBodyContent: <ExperienceModalBody experienceModalProps={
                                        {
                                            experience: experience,
                                            modalActionButton: {
                                                buttonText: "Cancel Registration",
                                                buttonColor: "bg-red-400",
                                                buttonAction: () => console.log("Cancel Registration Action")
                                            }
                                        }
                                    } />
                                }
                            } />
                        ))}
                    </div>

                    {/* HOSTED EXPERIENCES DISPLAY */}

                    <div className="mt-7 pl-9 py-3">
                        <h1 className="text-4xl font-bold">My Hosted Experiences</h1>
                    </div>
                    <div className="grid lg:grid-cols-4 p-10">
                        {userCreatedExperiences.data?.map(experience => (
                            <ExperienceCard experienceCardProps={
                                {
                                    experience: experience,
                                    actionButtonList: [
                                        {
                                            buttonText: "Edit",
                                            buttonColor: "bg-blue-400",
                                            buttonAction: () => console.log("Edit Experience Action")
                                        },
                                        {
                                            buttonText: "Delete",
                                            buttonColor: "bg-red-400",
                                            buttonAction: () => console.log("Delete Experience!")
                                        },
                                    ],
                                    modalButtonText: "Manage",
                                    modalHeaderContent: <GuestListModalHeader experience={experience} />,
                                    modalBodyContent: <GuestListModalBody />
                                }
                            } />
                        ))}
                    </div>
                </>
            ) : (
                <>Please sign in to see your experiences!</>
            )}
        </>
    )
}