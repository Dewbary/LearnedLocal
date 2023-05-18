import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Footer from "~/components/Footer/Footer";
import NavBar from "~/components/NavBar/NavBar";
import { ReactElement, useState } from "react";
import { Cog8ToothIcon, UserCircleIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import BasicInfo from "~/components/Profile/Tabs/BasicInfo";
import PaymentInfo from "~/components/Profile/Tabs/PaymentInfo";
import AdvancedSettings from "~/components/Profile/Tabs/AdvancedSettings";

type Tab = {
    label: string;
    icon: ReactElement<any, any>;
    tabContent?: ReactElement<any, any>;
}

export default function Profile () {

    const user = useUser();

    const [firstName, setFirstName] = useState("Chase");
    const [lastName, setLastName] = useState("Maxfield");
    const [bio, setBio] = useState("When I was 11 years old...");
    const [qualis, setQualis] = useState("I promise I'm qualified");
    const [instagram, setInstagram] = useState("@dj.cmax");
    const [facebook, setFacebook] = useState("facebooklink.com");
    const [venmoAccount, setVenmoAccount] = useState("");
    const [zelleAccount, setZelleAccount] = useState("");

    const deleteAccountAction = function () {
        confirm("Are you sure you want to delete your account?");
    }

    const Tabs = [
        {
            label: "Basic Info",
            icon: <UserCircleIcon className="w-5" />,
            tabContent: (
                <BasicInfo 
                    firstName={firstName} 
                    setFirstName={setFirstName} 
                    lastName={lastName} 
                    setLastName={setLastName} 
                    bio={bio} setBio={setBio} 
                    qualis={qualis} 
                    setQualis={setQualis} 
                    instagram={instagram}
                    setInstagram={setInstagram}
                    facebook={facebook}
                    setFacebook={setFacebook}
                />
            )
        },
        {
            label: "Payment Info",
            icon: <CreditCardIcon className="w-5" />,
            tabContent: (
                <PaymentInfo
                    venmoAccount={venmoAccount}
                    setVenmoAccount={setVenmoAccount}
                    zelleAccount={zelleAccount}
                    setZelleAccount={setZelleAccount}
                />
            )
        },
        {
            label: "Advanced Settings",
            icon: <Cog8ToothIcon className="w-5" />,
            tabContent: (
                <AdvancedSettings
                    deleteAccountAction={deleteAccountAction}
                />
            )
        }
    ] as Tab[];

    const [selectedTab, setSelectedTab] = useState(Tabs[0]);

    return (
        <div>
            <Head>
                <title>Learned Local</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar isSignedIn={user.isSignedIn || false} className="bg-white drop-shadow-md"/>
            <div className="flex flex-col w-full gap-10 min-h-screen pb-10">
                <div className="flex w-full justify-center py-10 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-50">
                    <h1 className="text-5xl font-bold">Profile and Settings</h1>
                </div>

                <div className="flex w-full gap-10">
                    <div className="basis-1/3 flex flex-col items-end gap-5 mt-5">
                        {Tabs.map(tab => (
                            <button 
                                className={`flex items-center gap-2 px-3 py-2 rounded-md ${selectedTab?.label === tab.label ? "bg-amber-400 text-white" : ""}`}
                                key={tab.label}
                                onClick={() => setSelectedTab(tab)}
                            >
                                <span>{tab.label}</span>
                                {tab.icon}
                            </button>
                        ))}
                    </div>
                    <div className="basis-2/3">
                        {selectedTab?.tabContent}
                    </div>
                </div>
            </div>

            
            
            <Footer />
        </div>
    )
}