import HostOnboardFlow from "~/components/Account/HostOnboardFlow/HostOnboardFlow";
import Footer from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";

export default function HostOnboard() {

  return (
    <>
      <div className="bg-ll-grey min-h-screen w-full flex flex-col items-center">
        <NewNavBar />
        <HostOnboardFlow />
        <Footer />
      </div>
    </>
  )
}