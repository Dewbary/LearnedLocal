import { useRouter } from "next/router";
import { api } from "~/utils/api";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Experience } from "@prisma/client";
import ExperienceImageDisplay from "../ExperienceImageDisplay";
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, ShareIcon } from "@heroicons/react/24/solid";
import { generateGoogleMapsURL } from "../FindExperience/FindExperienceUtils";
import { Pin } from "../CreateExperience/LocationPicker/LocationPicker";
import ShareExperienceComponent from "./ShareExperienceComponent";

export default function ViewExperiencePage() {

    const router = useRouter();
    const user = useUser();

    const [experience, setExperience] = useState({} as Experience);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState({} as Pin);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    let experienceId = "";
    
    if (router.query.slug !== undefined && typeof router.query.slug[0] === 'string') {
        experienceId = router.query.slug[0];
    }

    const { data: experienceData } = api.experience.byExperienceId.useQuery(parseInt(experienceId), {
        enabled: !!experienceId,
      });
    const getRegistrantCount = api.registration.registrantCountByExperience.useQuery(parseInt(experienceId));

    useEffect(() => {
        if (experienceData) {
            setExperience(experienceData);
            setLocation(experienceData.location as Pin);
            setIsLoading(false);
        }
    }, [experienceData, experienceId]);

    useEffect(() => {
        setLat(location.lat);
        setLng(location.lng);
    }, [location]);

    const dateDisplayOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
      } as const;

    const goToCheckoutPage = async function () {
        await router.push(`/experience/checkout?experienceId=${experienceId}`);
    };

    return (
        <>
            <Head>
                <title>Learned Local</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar isSignedIn={user.isSignedIn || false} className="bg-white drop-shadow-md"/>
            {isLoading ? (
                <div className="h-screen flex justify-center items-center">
                    <p>Experience is Loading...</p>
                </div>
            ) : (
                <div className="m-5 mt-20 lg:mx-20 lg:mt-10">

                    {/* EXPERIENCE TITLE AND HEADER */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-amber-400 via-amber-200 to-white p-3 lg:p-7 rounded-t-lg">
                        <div>
                           <h1 className="text-3xl lg:text-5xl font-bold">{experience.title}</h1>
                            <div>
                                <span>Hosted By {experience.firstName} {experience.lastName}</span>
                            </div> 
                        </div>
                        <div>
                            <ShareExperienceComponent experienceId={experience.id}/>
                        </div>
                    </div>

                    {/* IMAGES PORTION */}
                    <div className="mt-10">
                        <ExperienceImageDisplay photos={experience.photos}/>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 lg:mx-10">

                        {/* ACTION BUTTON BOX */}

                        <div className="w-full h-fit bg-white border drop-shadow-lg rounded-xl flex flex-col p-5 gap-5 lg:order-3 lg:basis-1/4">
                            <div>
                                <span className="text-3xl font-bold">${experience.price}</span><span> / person</span>
                            </div>
                            <div className="">
                                <UserIcon className="mr-2 inline w-5 rounded-full border border-black" />
                                <span>
                                    {getRegistrantCount.data}/{experience.maxAttendees} Spots Filled
                                </span>
                            </div>
                            <div>
                                <button className="bg-amber-400 text-white w-full p-2 rounded-lg font-bold drop-shadow-sm" onClick={() => goToCheckoutPage()}>Sign Up Now</button>
                            </div>
                        </div>

                        {/* ICON DETAILS GRID */}

                        <div className="grid basis-1/3 grid-cols-5 items-center gap-y-3 h-fit lg:order-2 lg:basis-1/4">
                            <ClockIcon className="w-5" />{" "}
                            <span className="col-span-4">
                                {experience.startTime} - {experience.endTime}
                            </span>
                            <MapPinIcon className="w-5" />{" "}
                            <span className="col-span-4">
                                <a
                                href={generateGoogleMapsURL(lat, lng)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                                >
                                View Experience Location
                                </a>
                            </span>
                            <CalendarIcon className="w-5" />{" "}
                            <span className="col-span-4">
                                {experience.date.toLocaleDateString(
                                "en-US",
                                dateDisplayOptions
                                )}
                            </span>
                            <UserIcon className="w-5" />{" "}
                            <span className="col-span-4">Ages {experience.minAge}+</span>
                        </div>

                        {/* TEXT DETAILS */}

                        <div className="lg:order-1 lg:basis-1/2">
                            <h3 className="text-xl font-bold">Description</h3>
                            <p>{experience.description}</p>
                            <br />
                            <h3 className="text-xl font-bold">Details</h3>
                            <hr className="w-64" />
                            <br />

                            <ul>
                                <li>
                                <strong>Guest Requirements:</strong>{" "}
                                {experience.guestRequirements}
                                </li>
                                <br />

                                <li>
                                <strong>Provided Resources:</strong> {experience.provided}
                                </li>
                                <br />

                                <li>
                                <strong>Activity Level:</strong> {experience.activityLevel}
                                </li>
                                <br />

                                <li>
                                <strong>Skill Level:</strong> {experience.skillLevel}
                                </li>
                            </ul>
                            <br />
                            <h3 className="text-xl font-bold">Itinerary</h3>
                            <p>{experience.timeline}</p>
                            <br />
                            <h3 className="text-xl font-bold">Location Notes</h3>
                            <p>{experience.locationDescription}</p>
                            <br />
                            <br />
                            </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}