import { useUser } from "@clerk/nextjs";
import HostBody from "~/components/Host/HostBody";
import Footer from "~/components/Landing/Footer";
import NewNavBar from "~/components/NewNavBar";

export default function Host() {
  const { isSignedIn } = useUser();

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-ll-grey">
        <NewNavBar isSignedIn={isSignedIn || false} isMarketingNavBar/>
        <HostBody />
        <Footer />
      </div>
    </>
  );
}
