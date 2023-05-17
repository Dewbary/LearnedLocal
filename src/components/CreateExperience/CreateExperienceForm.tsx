import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import type { TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs/CreateExperienceTabs";
import CreateExperienceFormArea from "./CreateExperienceFormArea";
import { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
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

  // State
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(startOfToday());
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(startOfToday(), "MMM-yyyy")
  );
  const [experienceIdStr, setExperienceIdStr] = useState<string>(
    experienceId ?? ""
  );

  const tabInfoList: TabInfo[] = getTabInfos(slug);

  const { next, back, goToStep, activeTab, step } = useNavigation(
    tabInfoList,
    slug,
    0,
    experienceIdStr
  );

  useEffect(() => {
    if (experience) {
      setSelectedDay(experience.date);
      setCurrentMonth(format(experience.date, "MMM-yyyy"));
    }
  }, [experience]);

  const handleSubmit = useExperienceSubmission(
    experienceId,
    slug,
    setIsCreating
  );

  const handleGoToNextStep = async (index: number) => {
    await goToStep(index);
  };

  return (
    <div className="space-between flex min-h-screen flex-col">
      {(experienceId && isLoading) || isCreating ? (
        <div className="flex h-screen items-center justify-center">
          <BounceLoader color="#FFC107" />
        </div>
      ) : (
        <>
          <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-white" />

          <div className="flex flex-col">
            <CreateExperienceHeader />

            <div className="flex flex-1 flex-col overflow-hidden px-0 md:flex-row md:px-4">
              <CreateExperienceTabs
                tabInfoList={tabInfoList}
                currentTab={activeTab?.activeMatcher}
                onTabClick={(index) => handleGoToNextStep(index)}
              />

              <main className="paragraph flex flex-1 rounded-lg bg-gradient-to-r from-amber-400 via-amber-200 to-slate-50 px-8 pb-8 pt-12 md:mb-12 md:ml-8 md:mr-12 md:pt-0">
                <Formik
                  initialValues={getInitialFormValues(experience)}
                  onSubmit={(values, helpers) => handleSubmit(values, helpers)}
                  enableReinitialize
                >
                  <Form className="w-full">
                    <CreateExperienceFormArea
                      tabComponent={getTabComponent(
                        activeTab?.activeMatcher ?? "",
                        !!experienceId,
                        selectedDay,
                        currentMonth,
                        setSelectedDay,
                        setCurrentMonth
                      )}
                      onNext={next}
                      onBack={back}
                      isFirstStep={step === 0}
                      isLastStep={step === tabInfoList.length - 1}
                    />
                  </Form>
                </Formik>
              </main>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default CreateExperienceForm;
