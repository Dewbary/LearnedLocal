import { api } from "~/utils/api";
import ExperienceCard from "../common/ExperienceCard";
import Image from "next/image";
import groupWithMap from "../../../assets/group_with_map.jpg";
import Link from "next/link";
import CustomModal from "../common/CustomModal";
import GuestListModalContents from "../common/GuestListModalContents";
import { useRouter } from "next/router";
import { Experience } from "packages/db";

export default function MyExperiencesPage() {

  const { data: userJoinedExperiences } = api.experience.getRegistered.useQuery();
  const { data: userParticipatedExperiences } = api.experience.getParticipated.useQuery();
  const { data: userCreatedExperiences } = api.experience.byUserId.useQuery();
  const experienceDeleter = api.experience.delete.useMutation();

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

  const deleteExperience = async function (experience: Experience) {
    if (confirm("Are you sure you want to delete this experience?") === true) {
      await experienceDeleter.mutateAsync(experience.id);
      router.reload();
    }
  };

  return (
    <>
      <div className="w-full flex-grow max-w-6xl flex flex-col p-5 mb-10">
        <div className="flex flex-col w-full gap-6">
          <h1 className="font-raleway text-3xl font-bold">My Experiences</h1>
          <div className="flex flex-col w-full gap-4">
            <h2 className="font-raleway text-xl font-bold">Upcoming</h2>
            <div className="flex flex-col w-full">
              {(userJoinedExperiences?.length || 0) > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                  {userJoinedExperiences?.map(registration => (
                    <ExperienceCard experience={registration.experience} isHomePageCard={false} key={registration.experience.id}/>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row overflow-hidden rounded-xl relative">
                  <div className="relative aspect-w-4 aspect-h-3 lg:aspect-w-7 lg:aspect-h-2 lg:order-2 lg:w-3/5">
                    <Image 
                      src={groupWithMap}
                      alt={"A group of people with a map"}
                      className="object-cover object-top"
                      fill
                    />
                  </div>
                  <div className="border border-l border-r border-b border-gray-400 rounded-br-xl rounded-bl-xl p-8 flex flex-col font-inter lg:order-1 lg:border-t lg:border-r-0 lg:rounded-tl-xl lg:rounded-br-none lg:basis-2/5 lg:items-center lg:justify-center">
                    <div className="flex flex-col gap-3 w-fit h-fit">
                      <div className="flex flex-col gap-2 lg:w-72">
                        <h3 className="font-bold">No booked experiences</h3>
                        <p className="font-light">It looks like it&apos;s time to get out and discover your next adventure!</p>
                      </div>
                      <Link href="/home" className="bg-ll-black hover:bg-ll-grey text-ll-grey hover:text-ll-black border border-ll-black py-4 px-6 rounded-full w-fit text-sm mt-2">
                        Start exploring
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>

          {/* Uncomment below when the experience saving feature actually works
          <div className="flex flex-col w-full gap-4">
            <h2 className="font-raleway text-xl font-bold">Saved</h2>
            <div className="flex flex-col w-full">
              <div className="border border-gray-400 rounded-xl p-8 flex flex-col font-inter gap-3 lg:flex-row lg:justify-between lg:items-center lg:px-20 lg:py-10">
                <div className="flex flex-col gap-3 w-fit lg:w-72 h-fit">
                  <h3 className="font-bold">No saved experiences</h3>
                  <p className="font-light">Start browsing experiences now and save the ones that catch your eye.</p>
                </div>
                <Link href="/home" className="bg-ll-black hover:bg-ll-grey text-ll-grey hover:text-ll-black border border-ll-black py-4 px-6 rounded-full w-fit text-sm mt-2 h-fit">
                  Start exploring
                </Link>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col w-full gap-4">
            <h2 className="font-raleway text-xl font-bold">What you&apos;ve done</h2>
            <div className="flex flex-col w-full">
              {(userParticipatedExperiences?.length || 0) > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                      {userParticipatedExperiences?.map(registration => (
                        <ExperienceCard experience={registration.experience} isHomePageCard={false} key={registration.experience.id}/>
                      ))}
                    </div>
                ) : (
                <div className="border border-gray-400 rounded-xl p-8 flex flex-col font-inter gap-3 lg:flex-row lg:justify-between lg:items-center lg:px-20 lg:py-10">
                  <div className="flex flex-col gap-3 w-fit lg:w-72 h-fit">
                    <h3 className="font-bold">Nothing yet!</h3>
                    <p className="font-light">Embark on your first experience so you can add to your list of adventures.</p>
                  </div>
                  <Link href="/home" className="bg-ll-black hover:bg-ll-grey text-ll-grey hover:text-ll-black border border-ll-black py-4 px-6 rounded-full w-fit text-sm mt-2 h-fit">
                    Start exploring
                  </Link>
                </div>
                )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <h2 className="font-raleway text-xl font-bold">Your Hosted Experiences</h2>
            <div className="flex flex-col w-full">
              {(userCreatedExperiences?.length || 0) > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                      {userCreatedExperiences?.map((experience) => (
                        <>
                          <ExperienceCard
                            experience={experience}
                            registered={false}
                            isHomePageCard={false}
                          >
                            <CustomModal
                              button={
                                <button className="z-20 rounded-lg bg-green-400 p-2 text-white drop-shadow-md hover:bg-green-500">
                                  Guests
                                </button>
                              }
                            >
                              <div className="flex h-full flex-col overflow-y-auto pb-12 md:h-5/6 md:max-h-[600px] md:pb-0 lg:rounded-3xl">
                                <GuestListModalContents experienceInfo={experience} />
                              </div>
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
                ) : (
                <div className="border border-gray-400 rounded-xl p-8 flex flex-col font-inter gap-3 lg:flex-row lg:justify-between lg:items-center lg:px-20 lg:py-10">
                  <div className="flex flex-col gap-3 w-fit lg:w-72 h-fit">
                    <h3 className="font-bold">Nothing here, give it a try!</h3>
                    <p className="font-light">Try hosting an experience with us and get paid to do what you love!</p>
                  </div>
                  <Link href="/host" className="bg-ll-black hover:bg-ll-grey text-ll-grey hover:text-ll-black border border-ll-black py-4 px-6 rounded-full w-fit text-sm mt-2 h-fit">
                    Create an Experience
                  </Link>
                </div>
                )}
            </div>
          </div>


        </div>
      </div>
    </>
  )
}