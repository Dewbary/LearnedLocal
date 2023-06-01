import { useRouter } from "next/router";
import { api } from "~/utils/api";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Experience } from "@prisma/client";
import ExperienceImageDisplay from "../ExperienceImageDisplay";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { generateGoogleMapsURL } from "../FindExperience/FindExperienceUtils";
import { Pin } from "../CreateExperience/LocationPicker/LocationPicker";
import ShareExperienceComponent from "./ShareExperienceComponent";
import { Facebook, Instagram } from "react-feather";

export default function ViewExperiencePage() {
  const router = useRouter();
  const user = useUser();

  const [experience, setExperience] = useState({} as Experience);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({} as Pin);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  let experienceId = "";

  if (
    router.query.slug !== undefined &&
    typeof router.query.slug[0] === "string"
  ) {
    experienceId = router.query.slug[0];
  }

  const { data: experienceData } = api.experience.byExperienceId.useQuery(
    parseInt(experienceId),
    {
      enabled: !!experienceId,
    }
  );

  const { data: profileData } = api.profile.getPublicProfile.useQuery({
    userId: experienceData?.authorId || ""
  });

  const getRegistrantCount =
    api.registration.registrantCountByExperience.useQuery(
      parseInt(experienceId)
    );

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
      <NavBar
        isSignedIn={user.isSignedIn || false}
        className="bg-white drop-shadow-md"
      />
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <p>Experience is Loading...</p>
        </div>
      ) : (
        <div className="m-5 mt-20 lg:mx-20 lg:mt-10">
          {/* EXPERIENCE TITLE AND HEADER */}
          <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-amber-400 via-amber-200 to-white p-3 lg:p-7">
            <div>
              <h1 className="text-2xl font-bold lg:text-5xl lg:mb-2">
                {experience.title}
              </h1>
              <div>
                <span>
                  Hosted By {experience.firstName} {experience.lastName}
                </span>
              </div>
            </div>
            <div>
              <ShareExperienceComponent experienceId={experience.id} />
            </div>
          </div>

          {/* IMAGES PORTION */}
          <div className="mt-10">
            <ExperienceImageDisplay photos={experience.photos} />
          </div>

          <div className="flex flex-col gap-10 lg:mx-10 lg:flex-row">

            {/* ACTION BUTTON BOX */}

            <div className="flex h-fit w-full flex-col gap-5 rounded-xl border bg-white p-5 drop-shadow-lg lg:order-3 lg:basis-1/4">
              <div>
                <span className="text-3xl font-bold">${experience.price}</span>
                <span> / person</span>
              </div>
              <div className="">
                <UserIcon className="mr-2 inline w-5 rounded-full border border-black" />
                <span>
                  {getRegistrantCount.data}/{experience.maxAttendees} Spots
                  Filled
                </span>
              </div>
              <div>
                <button
                  disabled={
                    (getRegistrantCount.data || 0) >= experience.maxAttendees
                  }
                  className="w-full rounded-lg bg-amber-400 p-2 font-bold text-white drop-shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500"
                  onClick={() => goToCheckoutPage()}
                >
                  Sign Up Now
                </button>
              </div>
            </div>

            {/* ICON DETAILS GRID */}

            <div className="grid h-fit basis-1/3 grid-cols-5 items-center gap-y-3 lg:order-2 lg:basis-1/4">
              <ClockIcon className="w-5" />{" "}
              <span className="col-span-4">
                {experience.startTime} - {experience.endTime}
              </span>
              <MapPinIcon className="w-5" />{" "}
              <span className="col-span-4">
                <a
                  href={generateGoogleMapsURL(
                    lat,
                    lng,
                    experienceData?.city ?? null,
                    false
                  )}
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
              <div>
                <h3 className="text-xl font-bold">Description</h3>
                <hr className="w-64" />
                <p>{experience.description}</p>
              </div>
              <div className="my-3 flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-bold">Details</h3>
                  <hr className="w-64" />
                </div>
                <div hidden={!experience.guestRequirements}>
                  <h5 className="font-bold">Guest Requirements:</h5>
                  <p>{experience.guestRequirements}</p>
                </div>
                <div hidden={!experience.provided}>
                  <h5 className="font-bold">Provided Resources:</h5>
                  <p>{experience.provided}</p>
                </div>
                <div hidden={!experience.activityLevel}>
                  <h5 className="font-bold">Activity Level:</h5>
                  <p>{experience.activityLevel}</p>
                </div>
                <div hidden={!experience.skillLevel}>
                  <h5 className="font-bold">Skill Level:</h5>
                  <p>{experience.skillLevel}</p>
                </div>
              </div>
              <div hidden={!experience.timeline}>
                <h3 className="text-xl font-bold">Itinerary</h3>
                <hr className="w-64" />
                <p>{experience.timeline}</p>
              </div>
              <div hidden={!experience.locationDescription}>
                <h3 className="text-xl font-bold">Location Notes</h3>
                <hr className="w-64" />
                <p>{experience.locationDescription}</p>
              </div>
            </div>
          </div>

          {/* ABOUT THE HOST */}
          <div className="flex flex-col gap-5 lg:mx-10 my-10 items-center">
              <div className="flex flex-col lg:flex-row lg:gap-3">
                <h3 className="text-3xl">About your Host:</h3>
                <h3 className="text-3xl font-bold">{profileData?.firstName} {profileData?.lastName}</h3>
              </div>
              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <div className="overflow-hidden">
                  <img src={profileData?.profileImage || ""} alt="Profile Image" className="w-72 rounded-full"/>
                </div>
                <div className="flex flex-col gap-3">
                  <p>{profileData?.bio || "[No Bio found]"}</p>
                  <p>{profileData?.qualis || "[No Qualifications found]"}</p>
                  <div className="flex items-start gap-3 flex-col">
                    <p>Social Media Links:</p>
                    {profileData?.instagram &&
                      <a href={profileData?.instagram} className="flex flex-row gap-1 items-center hover:text-blue-400"><Instagram /> {profileData?.instagram}</a>
                    }
                    {profileData?.facebook &&
                      <a href={profileData?.facebook} className="flex flex-row gap-1 items-center hover:text-blue-400"><Facebook /> {profileData?.facebook}</a>
                    }
                    
                  </div>
                </div>
              </div>
              
          </div>

        </div>
      )}
      <Footer />
    </>
  );
}
