import { useRouter } from "next/router";
import { api } from "~/utils/api";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ExperienceImageDisplay from "../common/ExperienceImageDisplay";
import { MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import { generateGoogleMapsURL } from "./ViewExperienceUtils";
import ShareExperienceComponent from "../common/ShareExperienceComponent";
import type { ExperienceInfo, Pin } from "@learnedlocal/db/types/types";
import ExperienceDateSelection from "../ExperiencesDisplay/ExperienceDateSelection";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "~/pages/experience/view/[...slug]";
import AboutTheHost from "./AboutTheHost";
import NewNavBar from "../NewNavBar";

export default function ViewExperiencePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const user = useUser();

  const [experience, setExperience] = useState<ExperienceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({} as Pin);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const { data: experienceData } = api.experience.viewByExperienceId.useQuery(
    props.experienceId
  );

  const { data: registrantCount } = api.registration.byExperience.useQuery(
    props.experienceId
  );

  useEffect(() => {
    if (experienceData) {
      setExperience(experienceData);
      setLocation(experienceData.location as Pin);
      setIsLoading(false);
    }
  }, [experienceData]);

  useEffect(() => {
    setLat(location.lat);
    setLng(location.lng);
  }, [location]);

  const goToCheckoutPage = async function (availabilityId: number | null) {
    if (!availabilityId) return;

    await router.push(
      `/checkout?experienceId=${props.experienceId}&availabilityId=${availabilityId}`
    );
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
        <>
          {experience && (
            <div className="m-5 mt-20 lg:mx-20 lg:mt-10">
              {/* EXPERIENCE TITLE AND HEADER */}
              <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-br from-amber-300 to-amber-500 p-3 lg:p-7">
                <div>
                  <h1 className="text-2xl font-bold lg:mb-2 lg:text-5xl">
                    {experience.title}
                  </h1>
                  <div>
                    <span>
                      Hosted By {experience.profile?.firstName}{" "}
                      {experience.profile?.lastName}
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

                <div className="flex h-fit w-full flex-col rounded-xl border bg-white p-5 drop-shadow-lg lg:order-3 lg:basis-1/4">
                  <div>
                    <span className="text-3xl font-bold">
                      {experience.free ? "Free" : `$${experience.price}`}
                    </span>
                    <span> / person</span>
                  </div>

                  <ExperienceDateSelection
                    availableDates={experience.availability}
                    registrationsCount={registrantCount}
                    availableSpots={experience.maxAttendees}
                    onSignUp={goToCheckoutPage}
                    experienceIsFull={experience.isFull}
                  />
                </div>

                {/* ICON DETAILS GRID */}

                <div className="grid h-fit basis-1/3 grid-cols-5 items-center gap-y-3 lg:order-2 lg:basis-1/4">
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
                      {experienceData?.city || "View Experience Location"}
                    </a>
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

              {experience.profile && (
                <div className="flex w-full flex-col items-center">
                  <AboutTheHost profile={experience.profile} className="mt-8" />
                </div>
              )}
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
}
