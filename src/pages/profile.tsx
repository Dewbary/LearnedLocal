import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Footer from "~/components/Footer/Footer";
import NavBar from "~/components/NavBar/NavBar";
import { useState } from "react";
import SavingInputField from "~/components/Profile/SavingInputField";
import SavingTextArea from "~/components/Profile/SavingTextArea";

export default function Profile () {

    const user = useUser();

    const [firstName, setFirstName] = useState("Chase");
    const [lastName, setLastName] = useState("Maxfield");
    const [bio, setBio] = useState("When I was 11 years old...");
    const [qualis, setQualis] = useState("I promise I'm qualified");

    return (
        <div>
            <Head>
                <title>Learned Local</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar isSignedIn={user.isSignedIn || false} className="bg-white drop-shadow-md"/>

            <div className="w-full flex flex-col gap-10 m-10">
                <SavingInputField label="First Name" savedValue={firstName} setSavedValue={setFirstName} />
                <SavingInputField label="Last Name" savedValue={lastName} setSavedValue={setLastName} />
                <SavingTextArea label="Biography / About You" savedValue={bio} setSavedValue={setBio} /> 
                <SavingTextArea label="Qualifications" savedValue={qualis} setSavedValue={setQualis} />
            </div>

            <Footer />
        </div>
    )
}