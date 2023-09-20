import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ExperienceInfo } from "~/components/types";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./ExperienceCard.module.css";

type Props = {
    experienceInfo: ExperienceInfo;
    showDateAndLocation: boolean;
    onClickModal?: ReactNode;
}

export default function ExperienceCard (props: PropsWithChildren<Props>) {

    const dateDisplayOptions = {
        month: "short",
        day: "2-digit",
    } as const;

    // MULTIPLE DATE LOGIC
    const availableDates = props.experienceInfo.availability?.map((a) => a.date);
    const dateToDisplay = props.experienceInfo.isFutureExperience ? "Coming Soon" : availableDates?.at(0)?.toLocaleDateString("en-US", dateDisplayOptions);

    return (
        <>
            <div className={`min-w-64 relative flex h-96 w-72 flex-col overflow-hidden rounded-2xl drop-shadow-xl`}>
                <Image
                    src={props.experienceInfo.photos[0] || ""}
                    alt="experience image"
                    className="absolute object-cover"
                    fill
                />
                <div className="absolute inset-0 flex flex-col justify-between ">
                    <div className="flex h-24 flex-1 flex-col justify-end">
                        {/* BOTTOM BAR */}
                        <div className="absolute top-2 left-2 h-12 w-12 flex-none overflow-hidden rounded-full">
                        {props.experienceInfo.profile?.profileImage ? (
                            <Image
                            src={props.experienceInfo.profile.profileImage}
                            alt="Profile Picture"
                            className="rounded-full object-cover"
                            fill
                            />
                        ) : (
                            <img
                            src="/profile_pic.png"
                            alt="Profile Picture Anonymous"
                            className="rounded-full object-cover"
                            />
                        )}
                        </div>
                        <div className="flex h-44 flex-col justify-between bg-opacity-0 bg-gradient-to-t from-black p-4 text-white">
                            <div className="flex flex-1 flex-col justify-end">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col justify-end">
                                        <div className="flex flex-1 items-center justify-between">
                                            <h2 className="text-left text-xl font-bold">
                                                {props.experienceInfo.title}
                                            </h2>
                                        </div>

                                        <div className="flex items-center justify-between">
                                        {props.showDateAndLocation == true && (
                                            <div className="flex flex-row items-center gap-1">
                                            <MapPinIcon className="w-5" />
                                            <h2 className="text-lg">{props.experienceInfo.city}</h2>
                                            </div>
                                        )}
                                        </div>
                                    </div>

                                    <div className="align-top">
                                        <h2 className="text-right text-xl font-bold">
                                        {dateToDisplay}
                                        </h2>
                                        {(availableDates?.length > 1 && !props.experienceInfo.isFutureExperience) && (
                                        <div className=" -m-1 mr-1 text-right text-sm">
                                            + More
                                        </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-2 mt-2 justify-center">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {props.onClickModal}

            </div>
        </>
    );
}