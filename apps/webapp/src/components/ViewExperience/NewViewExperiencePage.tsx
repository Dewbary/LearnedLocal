import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "~/pages/experience/newview/[...slug]";
import { api } from "~/utils/api";
import NewNavBar from "../NewNavBar";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GiftIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import {
  ChartBarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Instagram } from "react-feather";
import Footer from "../NewFooter/NewFooter";
import ShareExperienceComponent from "../common/ShareExperienceComponent";
import Link from "next/link";
import ExperienceDateSelection from "../ExperiencesDisplay/ExperienceDateSelection";
import { useRouter } from "next/router";
import EventSignUp from "./EventSignUp";

export default function NewViewExperiencePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const { data: experienceData } = api.experience.viewByExperienceId.useQuery(
    props.experienceId
  );

  const { data: registrantCount } = api.registration.byExperience.useQuery(
    props.experienceId
  );

  const scrollToImage = function (carouselId: string, imageId: string) {
    const carousel = document.getElementById(carouselId);
    const image = document.getElementById(imageId);
    if (carousel && image) {
      carousel.scrollLeft = image?.offsetLeft;
    }
  };

  const goToCheckoutPage = async function (availabilityId: number | null) {
    if (!availabilityId) return;

    await router.push(
      `/checkout?experienceId=${props.experienceId}&availabilityId=${availabilityId}`
    );
  };

  const instaLink = `https://instagram.com/${
    experienceData?.profile?.insta?.substring(1) || ""
  }`;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-ll-grey">
        <NewNavBar isSignedIn={isSignedIn || false} isMarketingNavBar={false} />
        <div className="pt-20 md:max-w-6xl md:pb-16 md:pt-24">
          <div className="flex w-full flex-row items-center justify-between px-5 py-5 md:py-7">
            <div className="flex flex-row items-center justify-start gap-3">
              <Link href="/home" className="md:hidden">
                <ChevronLeftIcon
                  width={25}
                  height={25}
                  className="text-ll-black"
                />
              </Link>
              <h1 className="font-raleway text-xl font-bold text-ll-black md:text-4xl">
                {experienceData?.title}
              </h1>
            </div>
            <ShareExperienceComponent experience={experienceData} />
          </div>

          <div
            id="carousel-1"
            className="carousel w-full overflow-y-auto md:hidden"
          >
            {experienceData?.photos.map((photo, index) => (
              <div
                key={index}
                id={`photo-${index}`}
                className="carousel-item aspect-h-1 aspect-w-1 relative w-full"
              >
                <Image
                  src={photo}
                  alt={"a photo of the experience"}
                  fill
                  className="w-full object-cover"
                />
                <div>
                  <button
                    className="absolute bottom-1/2 left-2 z-[2] h-fit w-fit rounded-full bg-ll-grey p-2 opacity-90"
                    onClick={() =>
                      scrollToImage(
                        "carousel-1",
                        `photo-${
                          index === 0
                            ? experienceData.photos.length - 1
                            : index - 1
                        }`
                      )
                    }
                  >
                    <ChevronLeftIcon
                      width={20}
                      height={20}
                      color="black opacity-100"
                    />
                  </button>
                  <button
                    className="absolute bottom-1/2 right-2 z-[2] h-fit w-fit rounded-full bg-ll-grey p-2 opacity-90"
                    onClick={() =>
                      scrollToImage(
                        "carousel-1",
                        `photo-${
                          index === experienceData.photos.length - 1
                            ? 0
                            : index + 1
                        }`
                      )
                    }
                  >
                    <ChevronRightIcon
                      width={20}
                      height={20}
                      color="black opacity-100"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden flex-row items-center gap-5 px-5 md:flex">
            <div className="relative basis-1/2 self-stretch">
              <Image
                src={experienceData?.photos?.at(0) || ""}
                alt="The main experience photo"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid basis-1/2 grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((index) => (
                <div className="relative aspect-[3/2]" key={index}>
                  {experienceData?.photos?.at(index) && (
                    <Image
                      src={experienceData.photos.at(index) || ""}
                      alt="Another experience photo"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-3 px-5 md:flex-row md:gap-20">
            <div className="order-2 flex w-full flex-col md:order-1 md:basis-2/3">
              <div className="flex w-full flex-row items-center gap-5 border-b-2 border-b-gray-300 pb-6 pt-5 md:gap-8 md:pt-0">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={experienceData?.profile?.profileImage || ""}
                    alt="The host's profile image"
                    fill
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-md font-raleway font-bold md:text-xl">
                    Hosted by {experienceData?.profile?.firstName}{" "}
                    {experienceData?.profile?.lastName}
                  </h2>
                  <p className="font-raleway text-sm">
                    {experienceData?.profile?.personalTitle}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 border-b-2 border-b-gray-300 py-5 md:flex-row md:gap-10">
                <div className="flex w-full flex-col gap-3 md:basis-2/3">
                  <h2 className="font-raleway text-lg font-bold md:text-xl">
                    Description
                  </h2>
                  <p className="font-inter text-sm font-light">
                    {experienceData?.description}
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3 font-inter text-sm font-light md:basis-1/3 md:pt-10">
                  <div className="flex flex-row items-center gap-2">
                    <MapPinIcon
                      width={20}
                      height={20}
                      className="text-ll-black"
                    />
                    <p>{experienceData?.city}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <UserIcon
                      width={20}
                      height={20}
                      className="text-ll-black"
                    />
                    <p>Ages {experienceData?.minAge}+</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <ChartBarIcon
                      width={20}
                      height={20}
                      className="text-ll-black"
                    />
                    <p>{experienceData?.skillLevel}</p>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 border-b-2 border-b-gray-300 py-5">
                <h2 className="font-raleway text-lg font-bold md:text-xl">
                  Details
                </h2>
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  {experienceData?.prepItems.length != 0 && (
                    <div className="flex w-full flex-col gap-3 font-inter">
                      <h3 className="text-[0.95rem] font-medium">
                        You&apos;ll need
                      </h3>
                      {experienceData?.prepItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center gap-2"
                        >
                          <CheckCircleIcon
                            width={20}
                            height={20}
                            className="shrink-0 text-ll-black"
                          />
                          <p className="text-sm font-light">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {experienceData?.includedItems.length != 0 && (
                    <div className="flex w-full flex-col gap-3 font-inter">
                      <h3 className="text-[0.95rem] font-medium">
                        What&apos;s included
                      </h3>
                      {experienceData?.includedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center gap-2"
                        >
                          <GiftIcon
                            width={20}
                            height={20}
                            className="shrink-0 text-ll-black"
                          />
                          <p className="text-sm font-light">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {experienceData?.activityNotes.length != 0 && (
                    <div className="flex w-full flex-col gap-3 font-inter">
                      <h3 className="text-[0.95rem] font-medium">
                        Activity Level
                      </h3>
                      {experienceData?.activityNotes.map((note, index) => (
                        <div
                          key={note}
                          className="flex flex-row items-center gap-2"
                        >
                          <HeartIcon
                            width={20}
                            height={20}
                            className="shrink-0 text-ll-black"
                          />
                          <p className="text-sm font-light">{note}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {experienceData?.additionalInformation !== "" && (
                <div className="flex w-full flex-col gap-4 border-b-2 border-b-gray-300 py-5">
                  <h2 className="font-raleway text-lg font-bold md:text-xl">
                    Additional Information
                  </h2>
                  <p className="font-inter text-sm font-light">
                    {experienceData?.additionalInformation}
                  </p>
                </div>
              )}

              <div className="flex w-full flex-col gap-5 py-5">
                <div className="flex w-full flex-row items-center justify-between gap-5 md:justify-start md:gap-10">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-raleway text-lg font-bold md:text-xl">
                      Meet your host
                    </h2>
                    <p className="font-raleway text-sm">
                      {experienceData?.profile?.firstName}{" "}
                      {experienceData?.profile?.lastName}
                    </p>
                  </div>
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={experienceData?.profile?.profileImage || ""}
                      alt="The host's profile image"
                      fill
                      className="w-full object-cover"
                    />
                  </div>
                </div>
                <p className="font-inter text-sm font-light">
                  {experienceData?.profile?.bio}
                </p>
                <a
                  href={instaLink}
                  target="_blank"
                  className="group flex w-fit flex-row gap-3 rounded-md border border-gray-400 px-2 py-1 transition-colors hover:border-ll-black hover:bg-ll-black"
                >
                  <Instagram
                    width={16}
                    color="currentColor"
                    className="text-ll-black transition-colors group-hover:text-ll-grey"
                  />
                  <p className="font-inter text-sm font-light transition-colors group-hover:text-ll-grey">
                    {experienceData?.profile?.insta}
                  </p>
                </a>
              </div>
            </div>

            <div className="order-1 flex h-fit w-full basis-1/3 flex-col font-inter md:order-2">
              {experienceData && (
                <EventSignUp
                  experience={experienceData}
                  registrantCount={registrantCount}
                  goToCheckoutPage={goToCheckoutPage}
                />
                // Todo: remove later
                // <ExperienceDateSelection
                //   availableDates={experienceData?.availability}
                //   registrationsCount={registrantCount}
                //   availableSpots={experienceData?.maxAttendees}
                //   onSignUp={goToCheckoutPage}
                //   experienceIsFull={experienceData?.isFull}
                // />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
