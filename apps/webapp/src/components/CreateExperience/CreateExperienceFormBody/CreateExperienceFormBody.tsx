import * as React from "react";
import CreateExperienceTabs from "../CreateExperienceTabs/CreateExperienceTabs";
import CreateExperienceFormArea from "../CreateExperienceFormArea";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/router";
import { getTabInfos, parseQueryString } from "../CreateExperienceFormUtils";
import { api } from "~/utils/api";
import { TabInfo } from "../types";
import { useNavigation } from "../hooks/useNavigation";
import CreateExperienceHelpDrawer from "../CreateExperienceHelpDrawer";
import FormNavigationBtns from "./FormNavigationBtns";

const CreateExperienceFormBody = () => {
  const router = useRouter();
  const slug = parseQueryString(router.query.slug);
  const experienceId = parseQueryString(router.query.experienceId);

  const { data: experience, isLoading: experienceDataLoading } =
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
  const isLoading: boolean = React.useMemo(() => {
    return (experienceId && experienceDataLoading) || isCreating;
  }, [experienceId, experienceDataLoading, isCreating]);

  return (
    // <CreateExperienceHelpDrawer>
    <div className="flex flex-1 flex-col bg-ll-grey md:flex-row">
      <div className="flex flex-1 flex-col">
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

        {/* For large screens */}
        <div className="mb-8 hidden justify-center md:flex">
          <FormNavigationBtns />
        </div>
      </div>
      <div className="border-r-2 border-black md:order-first md:flex md:w-64 md:flex-none">
        <CreateExperienceTabs
          tabInfoList={tabInfoList}
          onTabClick={(index) => handleGoToNextStep(index)}
        />
      </div>

      {/* For small screens */}
      <div className="mb-8 flex justify-center md:hidden">
        <FormNavigationBtns />
      </div>
    </div>

    // </CreateExperienceHelpDrawer>
  );
};

export default CreateExperienceFormBody;
