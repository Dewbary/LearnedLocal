import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "~/pages/experience/newview/[...slug]";
import { api } from "~/utils/api";
import NewNavBar from "../NewNavBar";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ArrowUpTrayIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, GiftIcon, HeartIcon } from "@heroicons/react/24/solid";
import { ChartBarIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import { Instagram } from "react-feather";
import Footer from "../NewFooter/NewFooter";
import ShareExperienceComponent from "../common/ShareExperienceComponent";
import Link from "next/link";
import ExperienceDateSelection from "../ExperiencesDisplay/ExperienceDateSelection";
import { useRouter } from "next/router";

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
  }

  const goToCheckoutPage = async function (availabilityId: number | null) {
    if (!availabilityId) return;

    await router.push(
      `/checkout?experienceId=${props.experienceId}&availabilityId=${availabilityId}`
    );
  };

  const instaLink = `https://instagram.com/${experienceData?.profile?.insta?.substring(1) || ""}`;

  return (
    <>
      <div className="bg-ll-grey min-h-screen w-full flex flex-col items-center">
        <NewNavBar isSignedIn={isSignedIn || false} isMarketingNavBar={false}/>
        <div className="pt-20 md:max-w-6xl md:pt-24 md:pb-16">

          <div className="w-full px-5 py-5 md:py-7 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-3">
              <Link href="/home" className="md:hidden">
                <ChevronLeftIcon width={25} height={25} className="text-ll-black"/>
              </Link>
              <h1 className="font-raleway text-ll-black font-bold text-xl md:text-4xl">{experienceData?.title}</h1>
            </div>
            <ShareExperienceComponent experienceId={experienceData?.id || 0} />
          </div>

          <div id="carousel-1" className="w-full carousel overflow-y-auto md:hidden">
              {experienceData?.photos.map((photo, index) => (
                <div key={index} id={`photo-${index}`} className="carousel-item relative w-full aspect-w-1 aspect-h-1">
                  <Image
                    src={photo}
                    alt={"a photo of the experience"}
                    fill
                    className="object-cover w-full"
                  />
                  <div>
                    <button
                      className="absolute bottom-1/2 left-2 z-[2] w-fit h-fit bg-ll-grey rounded-full p-2 opacity-90"
                      onClick={() => scrollToImage("carousel-1", `photo-${index === 0 ? experienceData.photos.length - 1 : index - 1}`)}
                    >
                      <ChevronLeftIcon width={20} height={20} color="black opacity-100" />
                    </button>
                    <button
                      className="absolute bottom-1/2 right-2 z-[2] w-fit h-fit bg-ll-grey rounded-full p-2 opacity-90"
                      onClick={() => scrollToImage("carousel-1", `photo-${index === experienceData.photos.length - 1 ? 0 : index + 1}`)}
                    >
                      <ChevronRightIcon width={20} height={20} color="black opacity-100" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="hidden md:flex flex-row items-center gap-5 px-5">
            <div className="relative basis-1/2 self-stretch">
                <Image
                  src={experienceData?.photos?.at(0) || ""}
                  alt="The main experience photo"
                  fill
                  className="object-cover"
                />
            </div>
            <div className="basis-1/2 grid grid-cols-2 gap-5">
              {[1, 2, 3, 4].map(index => (
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

          <div className="w-full flex flex-col md:flex-row px-5 gap-3 md:gap-20 mt-10">
            <div className="w-full flex flex-col md:basis-2/3 order-2 md:order-1">
              <div className="w-full flex flex-row items-center gap-5 md:gap-8 pb-6 pt-5 md:pt-0 border-b-2 border-b-gray-300">
                <div className="w-14 h-14 rounded-full overflow-hidden relative">
                  <Image
                    src={experienceData?.profile?.profileImage || ""}
                    alt="The host's profile image"
                    fill
                    className="object-cover w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-raleway font-bold text-md md:text-xl">
                    Hosted by {experienceData?.profile?.firstName} {experienceData?.profile?.lastName}
                  </h2>
                  <p className="font-raleway text-sm">
                    {experienceData?.profile?.personalTitle}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-10 py-5 border-b-2 border-b-gray-300">
                <div className="w-full flex flex-col gap-3 md:basis-2/3">
                  <h2 className="font-raleway font-bold text-lg md:text-xl">Description</h2>
                  <p className="font-inter font-light text-sm">
                    {experienceData?.description}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-3 font-inter font-light text-sm md:basis-1/3 md:pt-10">
                  <div className="flex flex-row gap-2 items-center">
                    <MapPinIcon width={20} height={20} className="text-ll-black" />
                    <p>{experienceData?.city}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <UserIcon width={20} height={20} className="text-ll-black" />
                    <p>Ages {experienceData?.minAge}+</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <ChartBarIcon width={20} height={20} className="text-ll-black" />
                    <p>{experienceData?.skillLevel}</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 py-5 border-b-2 border-b-gray-300">
                <h2 className="font-raleway font-bold text-lg md:text-xl">Details</h2>
                <div className="w-full flex flex-col gap-4 lg:flex-row">
                  {experienceData?.prepItems.length != 0 && (
                    <div className="font-inter w-full flex flex-col gap-3">
                      <h3 className="font-medium text-[0.95rem]">You&apos;ll need</h3>
                      {experienceData?.prepItems.map((item, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                          <CheckCircleIcon width={20} height={20} className="text-ll-black shrink-0" />
                          <p className="font-light text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {experienceData?.includedItems.length != 0 && (
                    <div className="font-inter w-full flex flex-col gap-3">
                      <h3 className="font-medium text-[0.95rem]">What&apos;s included</h3>
                      {experienceData?.includedItems.map((item, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                          <GiftIcon width={20} height={20} className="text-ll-black shrink-0" />
                          <p className="font-light text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {experienceData?.activityNotes.length != 0 && (
                    <div className="font-inter w-full flex flex-col gap-3">
                      <h3 className="font-medium text-[0.95rem]">Activity Level</h3>
                      {experienceData?.activityNotes.map((note, index) => (
                        <div key={note} className="flex flex-row items-center gap-2">
                          <HeartIcon width={20} height={20} className="text-ll-black shrink-0" />
                          <p className="font-light text-sm">{note}</p>
                        </div>
                      ))}                    
                    </div>
                  )}
                </div>              
              </div>
              
              {experienceData?.additionalInformation !== "" && (
                <div className="w-full flex flex-col gap-4 py-5 border-b-2 border-b-gray-300">
                  <h2 className="font-raleway font-bold text-lg md:text-xl">Additional Information</h2>
                  <p className="font-inter font-light text-sm">{experienceData?.additionalInformation}</p>
                </div>
              )}
              
              
              <div className="w-full flex flex-col gap-5 py-5">
                <div className="w-full flex flex-row items-center justify-between md:justify-start gap-5 md:gap-10">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-raleway font-bold text-lg md:text-xl">
                      Meet your host
                    </h2>
                    <p className="font-raleway text-sm">
                      {experienceData?.profile?.firstName} {experienceData?.profile?.lastName}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <Image
                      src={experienceData?.profile?.profileImage || ""}
                      alt="The host's profile image"
                      fill
                      className="object-cover w-full"
                    />
                  </div>
                </div>
                <p className="font-inter text-sm font-light">
                  {experienceData?.profile?.bio}
                </p>
                <a href={instaLink} target="_blank" className="border border-gray-400 rounded-md flex flex-row gap-3 px-2 py-1 w-fit group hover:border-ll-black hover:bg-ll-black transition-colors">
                  <Instagram width={16} color="currentColor" className="text-ll-black group-hover:text-ll-grey transition-colors"/>
                  <p className="font-inter text-sm font-light group-hover:text-ll-grey transition-colors">{experienceData?.profile?.insta}</p>
                </a>
              </div>

            </div>

            <div className="basis-1/3 flex h-fit w-full flex-col rounded-xl border-2 border-gray-300 p-5 font-inter order-1 md:order-2">
                  <div>
                    <span className="text-3xl font-bold">
                      {experienceData?.free ? "Free" : `$${experienceData?.price || 0}`}
                    </span>
                    <span> / person</span>
                  </div>
                  
                  {experienceData && (
                    <ExperienceDateSelection
                      availableDates={experienceData?.availability}
                      registrationsCount={registrantCount}
                      availableSpots={experienceData?.maxAttendees}
                      onSignUp={goToCheckoutPage}
                      experienceIsFull={experienceData?.isFull}
                    />
                  )}
                </div>
          </div>

          
        </div>
        <Footer />
      </div>
      
    </>
  );
}