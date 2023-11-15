import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Footer from "~/components/NewFooter/NewFooter";
import ExperienceCard from "~/components/common/ExperienceCard";
import { api } from "~/utils/api";

export default function Ideas() {

  const searchParams = useSearchParams();
  const subscriberId = searchParams.get("subscriberId") || "";
  const recommendedQuery = api.experience.getRecommended.useQuery(subscriberId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recommendedQuery.status !== "loading") {
      setIsLoading(false);
    }
  }, [recommendedQuery.status]);

  return (
    <>
      <div className="bg-ll-grey w-full min-h-screen flex flex-col items-center">
        <div className="flex flex-col gap-5 w-full max-w-sm px-5 py-10">
          <div className="text-3xl font-raleway font-semibold">
            Looking for weekend ideas?
          </div>
          <div className="font-inter font-light">
            Don&apos;t worry, we&apos;ve got you covered. Here are your experience recommendations in Utah County for this weekend.
          </div>
          {isLoading ? (
            <div className="flex flex-row items-center gap-3 justify-center h-96"> 
              <span className="loading loading-spinner" /> 
              <span className="text-sm font-light font-inter">Loading recommendations...</span>
            </div>
          ) : (
            <>
              {recommendedQuery.data?.map(experience => (
                <ExperienceCard experience={experience} isHomePageCard={true} key={experience.id}/>
              ))}
              {recommendedQuery.data?.length === 0 && (
                <div className="flex flex-row items-center gap-3 justify-center h-96 text-center"> 
                  <span className="text-sm font-light font-inter">We&apos;re sorry, we don&apos;t currently have any experiences posted for this weekend.</span>
                </div>
              )}
            </>
          )}
          
          <Link className="bg-ll-black text-ll-grey border border-ll-black text-center py-4 w-full rounded-full font-inter active:bg-ll-grey active:text-ll-black transition-colors" href="/home">
            See More Experiences
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}