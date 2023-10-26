import Footer from "~/components/Landing/Footer";
import LandingBody from "~/components/Landing/LandingBody";
import NavBar from "~/components/Landing/NavBar";

export default function landing () {
    return (
        <>
            <div className="flex flex-col bg-ll-grey items-center">
                <NavBar />
                <LandingBody />
                <Footer />
            </div>
        </>
    )
}