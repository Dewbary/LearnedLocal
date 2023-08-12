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
    <div className="flex min-h-screen flex-col">
      <NavBar
        className="border-none bg-white"
        isSignedIn={user.isSignedIn ?? false}
      />
      <div className="mt-4 flex flex-1 flex-col md:flex-row">
        <SignedIn>
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
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
      <Footer />
    </div>
  );
};

export default CreateExperienceForm;
