import LandingBody from "~/components/Landing/LandingBody";
import { useUser } from "@clerk/nextjs";
import NewFooter from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";

export default function Landing() {
  const { isSignedIn } = useUser();

  return (
    <>
      <div className="flex flex-col items-center bg-ll-grey">
        <NewNavBar isSignedIn={isSignedIn || false} isMarketingNavBar />
        <LandingBody />
        <NewFooter />
      </div>
    </>
  );
}
