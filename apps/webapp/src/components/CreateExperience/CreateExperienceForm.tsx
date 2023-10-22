import { useRouter } from "next/router";
import type { TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs/CreateExperienceTabs";
import CreateExperienceFormArea from "./CreateExperienceFormArea";
import { api } from "~/utils/api";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { getTabInfos, parseQueryString } from "./CreateExperienceFormUtils";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useNavigation } from "./hooks/useNavigation";
import { BounceLoader } from "react-spinners";
import * as React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import HelpMenuItem from "./HelpMenuItem";

const CreateExperienceForm = () => {
  const user = useUser();
  const router = useRouter();

  const slug = parseQueryString(router.query.slug);
  const experienceId = parseQueryString(router.query.experienceId);

  const { data: experience, isLoading } =
    api.experience.byExperienceId.useQuery(parseInt(experienceId), {
      enabled: !!experienceId,
    });

  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  const [experienceIdStr, setExperienceIdStr] = React.useState<string>( // TODO: can we remove this?
    experienceId ?? ""
  );

  const tabInfoList: TabInfo[] = getTabInfos(slug);

  const { next, back, goToStep, activeTab, step } = useNavigation(
    tabInfoList,
    slug,
    0,
    experienceIdStr
  );

  const handleGoToNextStep = async (index: number) => {
    await goToStep(index);
  };

  const showLoading = React.useMemo(() => {
    return (experienceId && isLoading) || isCreating;
  }, [experienceId, isLoading, isCreating]);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <NavBar
          className="border-none bg-white"
          isSignedIn={user.isSignedIn ?? false}
        />
        <div className="drawer drawer-end lg:drawer-open">
          <input
            id="create-experience-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <SignedIn>
              <div className="mt-4 flex flex-1 flex-col md:flex-row">
                {showLoading ? (
                  <div className="flex flex-1 items-center justify-center">
                    <BounceLoader color="#FFC107" />
                  </div>
                ) : (
                  <>
                    <CreateExperienceTabs
                      tabInfoList={tabInfoList}
                      onTabClick={(index) => handleGoToNextStep(index)}
                    />

                    <CreateExperienceFormArea
                      experience={experience}
                      slug={slug}
                      activeTab={activeTab}
                      step={step}
                      tabInfoList={tabInfoList}
                      setIsCreating={setIsCreating}
                      next={next}
                      back={back}
                    />
                  </>
                )}
              </div>
              <label
                htmlFor="create-experience-drawer"
                className="drawer-button fixed bottom-5 right-5 rounded-full bg-white shadow-md"
              >
                <QuestionMarkCircleIcon className="w-16 text-amber-500 lg:hidden" />
              </label>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="create-experience-drawer"
              className="drawer-overlay"
            />
            <div className="flex w-72 flex-col items-center gap-3 bg-white p-3 pt-20 pb-20 lg:w-96 lg:pt-3">
              <h1 className="text-3xl font-bold">Need help?</h1>
              <p>
                Thanks for creating an experience with Learned Local! Find the
                section below that you&apos;re currently working on and
                we&apos;ll give you some pointers!
              </p>
              <HelpMenuItem
                itemTitle="Step 1: Description"
                itemContent={
                  <p className="mt-3">
                    The title and description of your experience are what give
                    people their first impression of what your experience is
                    about! Make sure to explain simply what the experience is
                    and what people can hope to gain by attending.
                  </p>
                }
              />
              <HelpMenuItem
                itemTitle="Step 2: Date & Time"
                itemContent={
                  <p className="mt-3">
                    We recommend selecting a date that is at least several weeks
                    in advance for hosting your experience. This will give
                    people time to see your experience, decide whether they
                    would like to go, and make room for it on their calendars.
                    In addition, you can select multiple future dates for your
                    experience; simply click on the dates in the calendar of
                    when you would like to host your experience, and then enter
                    the time for each date you&apos;ve chosen.
                  </p>
                }
              />
              <HelpMenuItem
                itemTitle="Step 3: Location"
                itemContent={
                  <p className="mt-3">
                    The most common place our hosts put on their experiences is
                    in their own homes. However, if you need a larger space,
                    consider reserving a community space. If you need help
                    finding a location, don&apos;t hesitate to contact Learned Local
                    for help!
                  </p>
                }
              />
              <HelpMenuItem
                itemTitle="Step 4: Requirements"
                itemContent={
                  <p className="mt-3">
                    <p className="mb-3">
                      Your guests will feel more comfortable if they know how to
                      prepare for your experience.
                    </p>
                    <ul className="flex list-outside list-disc flex-col gap-3 pl-5">
                      <li>
                        <strong>Provided Materials:</strong> Here you can list
                        the tools or supplies that you&apos;ll be providing to your
                        guests.
                      </li>
                      <li>
                        <strong>Location Descriptions:</strong> Here you list
                        special instructions that the guests might need to
                        follow to get to your location, such as going to a
                        specific floor of a building, meeting at a trailhead,
                        and so on.
                      </li>
                      <li>
                        <strong>Guest Requirements:</strong> Here you can list
                        everything your guests should do beforehand to be ready
                        for the experience. You can also list things they need
                        to bring, things they need to wear, and so on.
                      </li>
                      <li>
                        <strong>Activity Level:</strong> Here you list specific
                        fitness requirements that your guests might need to
                        meet, such as being able to carry heavy objects or walk
                        for several hours.
                      </li>
                      <li>
                        <strong>Skill Level:</strong> specify what kind of prior
                        knowledge guests should have prior to participating in
                        your experience. For example, they may need to have had
                        practice using a welding torch before participating in
                        your metal crafting experience.
                      </li>
                    </ul>
                  </p>
                }
              />
              <HelpMenuItem
                itemTitle="Step 5: Settings"
                itemContent={
                  <p className="mt-3">
                    <p className="mb-3">
                      When pricing your experience, there are a few things to
                      keep in mind.
                    </p>
                    <ol className="mb-3 flex list-outside list-decimal flex-col gap-3 pl-5">
                      <li>
                        How much time are you spending to prepare this
                        experience?
                      </li>
                      <li>
                        How much are you spending on materials for this
                        experience?
                      </li>
                      <li>
                        What are similar experiences on our site and in other
                        places priced at?
                      </li>
                    </ol>
                    <p>
                      Unless your experience requires a lot of expensive
                      equipment or materials, we would recommend pricing it
                      between $20 and $50 per person.
                    </p>
                  </p>
                }
              />
              <HelpMenuItem
                itemTitle="Step 6: Photos"
                itemContent={
                  <p className="mt-3">
                    When uploading photos, try choosing photos that show the
                    space you&apos;re hosting the experience in, an example of
                    someone participating in your experience, or a finished
                    product of something you&apos;ll make. The more photos you
                    upload, the better.
                  </p>
                }
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateExperienceForm;
