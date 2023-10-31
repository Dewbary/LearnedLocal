import Footer from "~/components/Landing/Footer";
import LandingBody from "~/components/Landing/LandingBody";
import NavBar from "~/components/Landing/NavBar";
import { useUser } from "@clerk/nextjs";

export default function Landing () {

    const { isSignedIn } = useUser();

    return (
        <>
            <div className="flex flex-col bg-ll-grey items-center">
                <NavBar isSignedIn={isSignedIn || false} />
                <LandingBody />
                <Footer />
            </div>
        </>
    )
}