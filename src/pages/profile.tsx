import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Footer from "~/components/Footer/Footer";
import NavBar from "~/components/NavBar/NavBar";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Cog8ToothIcon, UserCircleIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import BasicInfo from "~/components/Profile/Tabs/BasicInfo";
import PaymentInfo from "~/components/Profile/Tabs/PaymentInfo";
import AdvancedSettings from "~/components/Profile/Tabs/AdvancedSettings";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type Tab = {
    label: string;
    icon: ReactElement<any, any>;
}

export default function Profile () {

    const user = useUser();
    const router = useRouter();

    const getProfile = api.profile.getProfile.useQuery();
    const {data: profile, isLoading: profileIsLoading} = getProfile;
    const updateProfile = api.profile.setProfile.useMutation();
    const createProfile = api.profile.createProfile.useMutation();
    const deleteUser = api.profile.deleteUser.useMutation();
    const [profileExists, setProfileExists] = useState("loading");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [qualis, setQualis] = useState("");
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [venmoAccount, setVenmoAccount] = useState("");
    const [zelleAccount, setZelleAccount] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        if (profile && !profileIsLoading) {
            setFirstName(profile.firstName || "");
            setLastName(profile.lastName || "");
            setBio(profile.bio || "");
            setQualis(profile.qualis || "");
            setInstagram(profile.instagram || "");
            setFacebook(profile.facebook || "");
            setVenmoAccount(profile.venmo || "");
            setZelleAccount(profile.zelle || "");
            setEmail(profile.email || "");
            setPhone(profile.phone || "");
            setProfileImage(profile.profileImage || "");

            setProfileExists("yes");
        }
        else if (!profile && !profileIsLoading) {
            setProfileExists("no");
        }
    }, [profile]);

    const handleSaveClick = async function () {

        if (profileExists === "no") {
            createProfile.mutate({
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                qualis: qualis,
                instagram: instagram,
                facebook: facebook,
                venmo: venmoAccount,
                zelle: zelleAccount,
                email: email,
                phone: phone,
                profileImage: profileImage,
            });

            router.reload();
        }
        else if (profileExists === "yes") {
            updateProfile.mutate({
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                qualis: qualis,
                instagram: instagram,
                facebook: facebook,
                venmo: venmoAccount,
                zelle: zelleAccount,
                email: email,
                phone: phone,
                profileImage: profileImage,
            });
        }
        
    }

    const deleteAccountAction = function () {
        if(confirm("Are you sure you want to delete your account?")) {
            deleteUser.mutate();
            router.push("/");
        }
    }

    const Tabs = [
        {
            label: "Basic Info",
            icon: <UserCircleIcon className="w-5" />
        },
        {
            label: "Payment Info",
            icon: <CreditCardIcon className="w-5" />
        },
        {
            label: "Advanced Settings",
            icon: <Cog8ToothIcon className="w-5" />
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

            <div className="flex flex-col w-full gap-10 min-h-screen pb-10 pt-14 lg:pt-0">
                <div className="flex w-full justify-center py-10 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-50">
                    <h1 className="text-3xl lg:text-5xl font-bold">Profile and Settings</h1>
                </div>

                <div className="flex w-full gap-10 flex-col lg:flex-row">
                    <div className="lg:basis-1/3 flex flex-col lg:items-end gap-2 lg:gap-5 lg:mt-5 mx-5 lg:mx-0">
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
                        <hr className="w-full lg:w-36" />
                        <button
                            disabled={firstName.length <= 0 || lastName.length <= 0} 
                            className="px-3 py-2 bg-green-400 rounded-md text-white drop-shadow-md disabled:bg-gray-400" 
                            onClick={() => handleSaveClick()}
                        >
                            {profileExists === "yes" ? "Save Changes" : "Create Profile"} 
                        </button>
                        <p 
                            hidden={!(firstName.length <= 0 || lastName.length <= 0)} 
                            className="text-red-600 w-full lg:w-48 text-center lg:text-right"
                        >
                            You must provide a first name and a last name.
                        </p>
                    </div>
                    <div className="basis-2/3">
                        {selectedTab?.label === "Basic Info" &&
                            <BasicInfo 
                                firstName={firstName} 
                                setFirstName={setFirstName} 
                                lastName={lastName} 
                                setLastName={setLastName} 
                                bio={bio} 
                                setBio={setBio} 
                                qualis={qualis} 
                                setQualis={setQualis} 
                                instagram={instagram}
                                setInstagram={setInstagram}
                                facebook={facebook}
                                setFacebook={setFacebook}
                                email={email}
                                setEmail={setEmail}
                                phone={phone}
                                setPhone={setPhone}
                                profileImage={profileImage}
                                setProfileImage={setProfileImage}
                            />
                        }
                        {selectedTab?.label === "Payment Info" &&
                            <PaymentInfo
                                venmoAccount={venmoAccount}
                                setVenmoAccount={setVenmoAccount}
                                zelleAccount={zelleAccount}
                                setZelleAccount={setZelleAccount}
                            />
                        }
                        {selectedTab?.label === "Advanced Settings" &&
                            <AdvancedSettings
                                deleteAccountAction={deleteAccountAction}
                            />
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}