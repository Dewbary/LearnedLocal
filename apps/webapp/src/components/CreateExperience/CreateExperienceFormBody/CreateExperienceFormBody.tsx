import * as React from "react";
import CreateExperienceTabs from "../CreateExperienceTabs/CreateExperienceTabs";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/router";
import {
  formPages,
  getCurrentFormPage,
  getInitialFormValues,
  initialValues,
  parseQueryString,
  validationSchema,
} from "../CreateExperienceFormUtils";
import { api } from "~/utils/api";
import { useNavigation } from "../hooks/useNavigation";
import FormNavigationBtns from "./FormNavigationBtns";
import { Form, Formik } from "formik";
import { useExperienceSubmission } from "../hooks/useExperienceSubmission";
import SaveAndExitButton from "../SaveAndExitButton";
import Link from "next/link";
import { ExperienceInfo } from "packages/db/types/types";
import FormPageHeader from "../FormPageHeader";

const CreateExperienceFormBody = () => {
  const router = useRouter();
  const slug = parseQueryString(router.query.slug);
  const experienceId = parseQueryString(router.query.experienceId);
  const [expToUpdate, setExpToUpdate] = React.useState<ExperienceInfo | null>(
    null
  );
  const [initialFormValues, setInitialFormValues] =
    React.useState(initialValues);

  const { data: experience, isLoading: experienceDataLoading } =
    api.experience.byExperienceId.useQuery(parseInt(experienceId), {
      enabled: !!experienceId,
    });

  React.useEffect(() => {
    if (experience) {
      setExpToUpdate(experience);
      setInitialFormValues(getInitialFormValues(expToUpdate));
    }
  }, [experience]);

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

  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [experienceIdStr, setExperienceIdStr] = React.useState<string>( // TODO: can we remove this?
    experienceId ?? ""
  );
  const [isDraft, setIsDraft] = React.useState<boolean>(true);

  const { next, back, goToStep, activeTab, step } = useNavigation(
    formPages,
    slug,
    0,
    experienceIdStr
  );
  const handleGoToNextStep = async (index: number) => {
    await goToStep(index);
  };
  const isLoading: boolean = React.useMemo(() => {
    return (experienceId && experienceDataLoading) || isCreating;
  }, [experienceId, experienceDataLoading, isCreating]);

  const handleSubmit = useExperienceSubmission(
    expToUpdate?.id.toString() ?? null,
    slug,
    setIsCreating,
    profile?.id
  );

  const { tabTitle, pageTitle, subTitle, pageComponent } = getCurrentFormPage(
    activeTab?.url ?? "",
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
    <Formik
      key={slug}
      initialValues={initialFormValues}
      onSubmit={async (values, helpers) => {
        await handleSubmit(values, helpers, isDraft);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      <Form className="flex flex-1">
        <div className="relative flex flex-1 flex-col bg-ll-grey">
          <div className="md:ml-64">
            <FormPageHeader title={pageTitle} subTitle={subTitle} />
          </div>
          <div className="mb-4 ml-4 md:absolute md:left-9 md:top-6 md:mb-0 md:ml-0">
            <SaveAndExitButton setDraftState={setIsDraft} />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col">
              <div className="relative mb-8 ml-8 mr-8 flex flex-1 flex-col md:ml-0 md:mr-8">
                <div className="min-h-[400px] rounded-2xl md:border md:border-ll-slate md:p-14">
                  {pageComponent}
                </div>
              </div>

              {/* For large screens */}
              <div className="mb-8 hidden justify-center md:flex">
                <FormNavigationBtns
                  onNext={next}
                  onBack={back}
                  showSubmit={tabTitle === "Photos"}
                  hideBack={tabTitle === "General"}
                  isEditing={!!expToUpdate?.id}
                  setDraftState={setIsDraft}
                />
              </div>
            </div>

            <div className="md:order-first md:flex md:w-64 md:flex-none">
              <CreateExperienceTabs
                tabInfoList={formPages}
                onTabClick={(index) => handleGoToNextStep(index)}
              />
            </div>
          </div>

          {/* For small screens */}
          <div className="mb-8 flex justify-center md:hidden">
            <FormNavigationBtns
              onNext={next}
              onBack={back}
              showSubmit={tabTitle === "Photos"}
              hideBack={tabTitle === "General"}
              isEditing={!!expToUpdate?.id}
              setDraftState={setIsDraft}
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateExperienceFormBody;

// from old createExperienceFormArea
// const { data: profile, isLoading: profileIsLoading } =
//   api.profile.getProfile.useQuery();

// const [profileExists, setProfileExists] = React.useState("loading");

// React.useEffect(() => {
//   if (profile && !profileIsLoading) {
//     setProfileExists("yes");
//   } else if (!profile && !profileIsLoading) {
//     setProfileExists("no");
//   }
// }, [profile, profileIsLoading]);

// const handleSubmit = useExperienceSubmission(
//   experience?.id.toString() ?? null,
//   slug,
//   setIsCreating,
//   profile?.id
// );

// const initialValues = getInitialFormValues(experience);

// const { pageTitle, subTitle, pageComponent } = getCurrentFormPage(
//   activeTab?.url ?? "",
//   !!experience?.id
// );

// if (profileExists !== "yes" && profileExists !== "loading") {
//   return (
//     <div className="relative flex flex-1 flex-col bg-ll-grey p-9">
//       <div className="flex flex-1 flex-col items-center justify-center gap-5">
//         <p>
//           You need to set up your hosting profile before creating an experience
//         </p>
//         <Link href="/account/hostonboard" className="btn btn-primary">
//           Set Up My Profile
//         </Link>
//       </div>
//     </div>
//   );
// }
