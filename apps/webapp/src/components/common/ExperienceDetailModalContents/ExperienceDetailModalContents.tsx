import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { useRouter } from "next/router";
import ExpImageCarousel from "./ExpImageCarousel";
import ExpDetailsSection from "./ExpDetailsSection";
import { useUser } from "@clerk/nextjs";

type Props = {
  experienceInfo: ExperienceInfo;
  showRegisteredDetails: boolean;
};

export default function ExperienceDetailModalContents({
  experienceInfo,
}: Props) {
  const router = useRouter();
  const user = useUser();

  const handleViewPageClick = async function () {
    window.gtag("event", "view_details", {
      experience_title: experienceInfo.title,
      is_external_experience: experienceInfo.isExternalListing,
      email: user.user?.emailAddresses[0],
    });

    if (
      experienceInfo.isExternalListing &&
      experienceInfo.externalListingLink !== null
    ) {
      window.location.assign(experienceInfo.externalListingLink);
    } else {
      await router.push(`/experience/view/${experienceInfo.id}`);
    }
  };

  return (
    <div className="mx-auto flex w-5/6 flex-1 flex-col justify-center bg-ll-grey md:w-full md:flex-row">
      <div className="relative z-10 h-96 min-h-[500px] w-full md:mb-0 md:ml-8 md:h-auto md:w-5/12">
        <ExpImageCarousel photos={experienceInfo.photos} />
      </div>
      <div className="flex flex-1 flex-col md:ml-8">
        <ExpDetailsSection
          experienceInfo={experienceInfo}
          handleViewPageClick={handleViewPageClick}
        />
      </div>
    </div>
  );
}
