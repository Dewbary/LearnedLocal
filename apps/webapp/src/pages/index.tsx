import LandingBody from "~/components/Landing/LandingBody";
import NewFooter from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";

export default function Landing() {

  return (
    <>
      <div className="flex flex-col items-center bg-ll-grey">
        <NewNavBar />
        <LandingBody />
        <NewFooter />
      </div>
    </>
  );
}
