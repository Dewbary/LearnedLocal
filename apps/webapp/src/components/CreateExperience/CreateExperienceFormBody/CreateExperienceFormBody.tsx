import * as React from "react";
import CreateExperienceTabs from "../CreateExperienceTabs/CreateExperienceTabs";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/router";
import {
  formPages,
  getCurrentFormPage,
  getInitialFormValues,
  parseQueryString,
  validationSchema,
} from "../CreateExperienceFormUtils";
import { api } from "~/utils/api";
import { useNavigation } from "../hooks/useNavigation";
import CreateExperienceHelpDrawer from "../CreateExperienceHelpDrawer";
import FormNavigationBtns from "./FormNavigationBtns";
import { Form, Formik } from "formik";
import FormTabLayout from "../FormTabLayout";
import { useExperienceSubmission } from "../hooks/useExperienceSubmission";
import SaveAndExitButton from "../FormTabLayout/SaveAndExitButton";
import FormPageHeader from "../FormTabLayout/FormPageHeader";

const CreateExperienceFormBody = () => {
  const router = useRouter();
  const slug = parseQueryString(router.query.slug);
  const experienceId = parseQueryString(router.query.experienceId);

  const { data: experience, isLoading: experienceDataLoading } =
    api.experience.byExperienceId.useQuery(parseInt(experienceId), {
      enabled: !!experienceId,
    });

  const { data: profile, isLoading: profileIsLoading } =
    api.profile.getProfile.useQuery();

  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [experienceIdStr, setExperienceIdStr] = React.useState<string>( // TODO: can we remove this?
    experienceId ?? ""
  );

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
    experience?.id.toString() ?? null,
    slug,
    setIsCreating,
    profile?.id
  );

  const initialValues = getInitialFormValues(experience);

  const { pageTitle, subTitle, pageComponent } = getCurrentFormPage(
    activeTab?.url ?? "",
    !!experience?.id
  );

  return (
    // <CreateExperienceHelpDrawer>
    <div className="relative flex flex-1 flex-col bg-ll-grey">
      <div className="absolute right-9 top-4">
        <SaveAndExitButton />
      </div>

      <div className="md:ml-64">
        <FormPageHeader title={pageTitle} subTitle={subTitle} />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col">
          <div className="relative mb-8 ml-8 mr-8 flex flex-1 flex-col md:ml-0 md:mr-8">
            <Formik
              key={slug}
              initialValues={initialValues}
              onSubmit={(values, helpers) => handleSubmit(values, helpers)}
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <div className="min-h-[400px] rounded-2xl md:border md:border-ll-slate md:p-14">
                  {pageComponent}
                </div>
              </Form>
            </Formik>
          </div>

          {/* For large screens */}
          <div className="mb-8 hidden justify-center md:flex">
            <FormNavigationBtns onNext={next} onBack={back} />
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
        <FormNavigationBtns onNext={next} onBack={back} />
      </div>
    </div>

    // </CreateExperienceHelpDrawer>
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
