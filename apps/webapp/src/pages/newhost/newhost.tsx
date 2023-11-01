import NavBar from "~/components/Landing/NavBar";
import { useUser } from "@clerk/nextjs";
import HostBody from "~/components/Host/HostBody";
import Footer from "~/components/Landing/Footer";

export default function NewHost() {

    const { isSignedIn } = useUser();

    return (
        <>
            <div className="flex flex-col bg-ll-grey items-center min-h-screen w-full">
                <NavBar isSignedIn={isSignedIn || false}/>
                <HostBody />
                <Footer />
            </div>
        </>
    )
}