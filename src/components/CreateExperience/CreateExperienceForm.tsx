import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import type { TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs/CreateExperienceTabs";
import CreateExperienceFormArea from "./CreateExperienceFormArea";
import { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import { api } from "~/utils/api";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  getTabComponent,
  getTabInfos,
  getInitialFormValues,
  parseQueryString,
} from "./CreateExperienceFormUtils";
import CreateExperienceHeader from "./Layout/CreateExperienceHeader";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useExperienceSubmission } from "./hooks/useExperienceSubmission";
import { useNavigation } from "./hooks/useNavigation";
import { BounceLoader } from "react-spinners";

const CreateExperienceForm = () => {
  // Hooks
  const user = useUser();
  const router = useRouter();

  // Router
  const slug = parseQueryString(router.query.slug);
  const experienceId = parseQueryString(router.query.experienceId);

  const { data: experience, isLoading } =
    api.experience.byExperienceId.useQuery(parseInt(experienceId), {
      enabled: !!experienceId,
    });

  const { data: profile, isLoading: profileIsLoading } =
    api.profile.getProfile.useQuery();

  // State
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(startOfToday());
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(startOfToday(), "MMM-yyyy")
  );
  const [experienceIdStr, setExperienceIdStr] = useState<string>(
    experienceId ?? ""
  );
  const [profileExists, setProfileExists] = useState("loading");

  const tabInfoList: TabInfo[] = getTabInfos(slug);

  const { next, back, goToStep, activeTab, step } = useNavigation(
    tabInfoList,
    slug,
    0,
    experienceIdStr
  );

  const handleSubmit = useExperienceSubmission(
    experienceId,
    slug,
    setIsCreating,
    profile?.id
  );

  const handleGoToNextStep = async (index: number) => {
    await goToStep(index);
  };

  //////////////// PROFILE LOAD CHECK /////////////

  useEffect(() => {
    if (profile && !profileIsLoading) {
      setProfileExists("yes");
    } else if (!profile && !profileIsLoading) {
      setProfileExists("no");
    }
  });

  ///// GO TO PROFILE PAGE FUNCTION /////

  const navigateToProfilePage = async function () {
    await router.push("/profile");
  };

  return (
    <div className="space-between flex min-h-screen flex-col">
      <SignedIn>
        {(experienceId && isLoading) || isCreating ? (
          <div className="flex h-screen items-center justify-center">
            <BounceLoader color="#FFC107" />
          </div>
        ) : (
          <>
            <NavBar
              isSignedIn={user.isSignedIn ?? false}
              className="bg-white"
            />

            <div className="flex flex-col">
              <CreateExperienceHeader />

              <div className="flex flex-1 flex-col overflow-hidden px-0 md:flex-row md:px-4">
                <CreateExperienceTabs
                  tabInfoList={tabInfoList}
                  currentTab={activeTab?.activeMatcher}
                  onTabClick={(index) => handleGoToNextStep(index)}
                />

                <main className="paragraph flex flex-1 rounded-lg bg-gradient-to-r from-amber-400 via-amber-200 to-slate-50 px-8 pb-8 pt-12 md:mb-12 md:ml-8 md:mr-12 md:pt-0">
                  {profileExists === "yes" || profileExists === "loading" ? (
                    <Formik
                      initialValues={getInitialFormValues(experience)}
                      onSubmit={(values, helpers) =>
                        handleSubmit(values, helpers)
                      }
                      enableReinitialize
                    >
                      <Form className="w-full">
                        <CreateExperienceFormArea
                          tabComponent={getTabComponent(
                            activeTab?.activeMatcher ?? "",
                            !!experienceId
                          )}
                          onNext={next}
                          onBack={back}
                          isFirstStep={step === 0}
                          isLastStep={step === tabInfoList.length - 1}
                        />
                      </Form>
                    </Formik>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
                      <p>
                        You need to create a profile before creating your first
                        experience.
                      </p>
                      <button
                        className="btn-primary btn"
                        onClick={() => navigateToProfilePage()}
                      >
                        Set Up My Profile
                      </button>
                    </div>
                  )}
                </main>
              </div>
            </div>
            <Footer />
          </>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default CreateExperienceForm;
