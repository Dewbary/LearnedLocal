import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import ExperienceImageDisplay from "../ExperienceImageDisplay";
import { useRouter } from "next/router";
import ExpImageCarousel from "./ExpImageCarousel";
import ExpDetailsSection from "./ExpDetailsSection";
import Button from "../Button";
import CardFavoriteButton from "../CardFavoriteButton";

type Props = {
  experienceInfo: ExperienceInfo;
  showRegisteredDetails: boolean;
};

export default function ExperienceDetailModalContents({
  experienceInfo,
  showRegisteredDetails,
}: Props) {
  const router = useRouter();

  const handleViewPageClick = async function () {
    window.gtag("event", "view_details", {
      experience_title: experienceInfo.title,
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
    <div className="mt-20 flex flex-1 flex-col bg-white md:mb-16 md:flex-row">
      <div className="relative mb-8 max-h-[600px] min-h-[200px] w-full min-w-[300px] md:mb-0 md:ml-8 md:h-auto md:w-5/12">
        <ExpImageCarousel photos={experienceInfo.photos} />
      </div>
      <div className="mb-8 flex w-5/6 flex-shrink flex-col justify-between self-center md:mx-8 md:w-7/12">
        <ExpDetailsSection
          experienceInfo={experienceInfo}
          handleViewPageClick={handleViewPageClick}
        />
      </div>
    </div>
  );
}
