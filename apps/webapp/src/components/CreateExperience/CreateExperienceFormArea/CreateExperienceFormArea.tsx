import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { api } from "~/utils/api";
import {
  getInitialFormValues,
  getTabComponent,
  validationSchema,
} from "../CreateExperienceFormUtils";
import { ExperienceInfo } from "~/components/types";
import { useExperienceSubmission } from "../hooks/useExperienceSubmission";
import CreateExperienceFormLayout from "./CreateExperienceFormLayout";
import type { TabInfo } from "../types";

type Props = {
  experience: ExperienceInfo | null | undefined;
  slug: string;
  activeTab: TabInfo | undefined;
  step: number;
  tabInfoList: TabInfo[];
  setIsCreating: (isCreating: boolean) => void;
  next: () => void;
  back: () => void;
};

const CreateExperienceFormArea = ({
  experience,
  slug,
  activeTab,
  step,
  tabInfoList,
  setIsCreating,
  next,
  back,
}: Props) => {
  const router = useRouter();
  const { data: profile, isLoading: profileIsLoading } =
    api.profile.getProfile.useQuery();

  const [profileExists, setProfileExists] = React.useState("loading");

  React.useEffect(() => {
    if (profile && !profileIsLoading) {
      setProfileExists("yes");
    } else if (!profile && !profileIsLoading) {
      setProfileExists("no");
    }
  });

  const navigateToProfilePage = async function () {
    await router.push("/profile");
  };

  const handleSubmit = useExperienceSubmission(
    experience?.id.toString() ?? null,
    slug,
    setIsCreating,
    profile?.id
  );

  const initialValues = getInitialFormValues(experience);

  return (
    <div className="flex flex-1 rounded-lg bg-gradient-to-r from-amber-400 via-amber-200 to-slate-50 px-4 pb-12 pt-20 md:mx-4 md:mb-4 md:p-8">
      {profileExists === "yes" || profileExists === "loading" ? (
        <Formik
          key={slug}
          initialValues={initialValues}
          onSubmit={(values, helpers) => handleSubmit(values, helpers)}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form className="flex flex-1">
            <CreateExperienceFormLayout
              tabComponent={getTabComponent(
                activeTab?.activeMatcher ?? "",
                !!experience?.id
              )}
              onNext={next}
              onBack={back}
              slug={slug}
              isFirstStep={step === 0}
              isLastStep={step === tabInfoList.length - 1}
            />
          </Form>
        </Formik>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <p>
            You need to create a profile before creating your first experience.
          </p>
          <button
            className="btn-primary btn"
            onClick={() => navigateToProfilePage()}
          >
            Set Up My Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateExperienceFormArea;
