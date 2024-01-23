import { Form, Formik } from "formik";
import * as React from "react";
import { api } from "~/utils/api";
import {
  getInitialFormValues,
  getCurrentFormPage,
  validationSchema,
} from "../CreateExperienceFormUtils";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { useExperienceSubmission } from "../hooks/useExperienceSubmission";
import FormTabLayout from "./FormTabLayout";
import type { TabInfo } from "../types";
import Link from "next/link";

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
  const { data: profile, isLoading: profileIsLoading } =
    api.profile.getProfile.useQuery();

  const [profileExists, setProfileExists] = React.useState("loading");

  React.useEffect(() => {
    if (profile && !profileIsLoading) {
      setProfileExists("yes");
    } else if (!profile && !profileIsLoading) {
      setProfileExists("no");
    }
  }, [profile, profileIsLoading]);

  const handleSubmit = useExperienceSubmission(
    experience?.id.toString() ?? null,
    slug,
    setIsCreating,
    profile?.id
  );

  const initialValues = getInitialFormValues(experience);

  const { title, subTitle, pageComponent } = getCurrentFormPage(
    activeTab?.activeMatcher ?? "",
    !!experience?.id
  );

  if (profileExists !== "yes" && profileExists !== "loading") {
    return (
      <div className="relative flex flex-1 flex-col bg-ll-grey p-9">
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <p>
            You need to set up your hosting profile before creating an
            experience
          </p>
          <Link href="/account/hostonboard" className="btn btn-primary">
            Set Up My Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col p-9">
      <Formik
        key={slug}
        initialValues={initialValues}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <FormTabLayout
            title={title}
            subTitle={subTitle}
            pageComponent={pageComponent}
            slug={slug}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateExperienceFormArea;
