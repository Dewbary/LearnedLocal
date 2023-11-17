import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Footer from "~/components/Footer/Footer";
import NavBar from "~/components/NavBar/NavBar";
import ProfilePageForm from "~/components/Profile/ProfilePageForm";

export default function Profile () {

    const user = useUser();

    return (
        <div>
            <Head>
                <title>Learned Local</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <NavBar isSignedIn={user.isSignedIn || false} className="bg-white drop-shadow-md"/>

            <ProfilePageForm />

            <Footer />
        </div>
    )
}