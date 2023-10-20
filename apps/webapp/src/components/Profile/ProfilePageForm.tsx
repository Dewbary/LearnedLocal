import { Cog8ToothIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ReactElement, useEffect, useState } from "react";
import BasicInfo from "./Tabs/BasicInfo";
import PaymentInfo from "./Tabs/PaymentInfo";
import AdvancedSettings from "./Tabs/AdvancedSettings";
import { Form, Formik } from "formik";
import { api } from "~/utils/api";
import { Profile } from "@learnedlocal/db";
import { useRouter } from "next/router";
import * as Yup from 'yup';

interface FormValues {
    firstName: string;
    lastName: string;
    bio: string | null;
    social: string | null;
    insta: string | null;
    facebook: string | null;
    venmo: string | null;
    zelle: string | null;
    email: string | null;
    phone: string | null;
    profileImage: string | null;
}

type Tab = {
    label: string;
    icon: ReactElement<any, any>;
}

export default function ProfilePageForm() {

    const router = useRouter();

    const {data: profileData} = api.profile.getProfile.useQuery();
    const createOrUpdateUser = api.profile.createOrUpdateProfile.useMutation();
    const deleteUser = api.profile.deleteUser.useMutation();
    const [profile, setProfile] = useState({} as Profile | null | undefined);

    const [saveToastVisible, setSaveToastVisible] = useState(false);

    const phoneNumberRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    useEffect(() => {
        setProfile(profileData);
    }, [profileData]);

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

    const deleteAccountAction = async function () {
        if(confirm("Are you sure you want to delete your account?")) {
            deleteUser.mutate();
            await router.push("/");
        }
    }

    const handleSaveChangeClick = async function (values:FormValues) {
        await createOrUpdateUser.mutateAsync(values);
        setSaveToastVisible(true);
        setTimeout(() => setSaveToastVisible(false), 6000);
    }

    return (
        <div className="flex flex-col w-full gap-10 min-h-screen pb-10 pt-14 lg:pt-0">
            <div className="flex w-full justify-center py-10 bg-gradient-to-br from-amber-300 to-amber-500">
                <h1 className="text-3xl lg:text-5xl font-bold">Profile and Settings</h1>
            </div>

            <Formik
                initialValues={{
                    firstName: profile?.firstName || "",
                    lastName: profile?.lastName || "",
                    bio: profile?.bio || "",
                    social: profile?.social || "",
                    insta: profile?.insta || "",
                    facebook: profile?.facebook || "",
                    venmo: profile?.venmo || "",
                    zelle: profile?.zelle || "",
                    email: profile?.email || "",
                    phone: profile?.phone || "",
                    profileImage: profile?.profileImage || ""
                }}
                onSubmit={(values:FormValues) => {void handleSaveChangeClick(values)}}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required("First Name is a required field"),
                    lastName: Yup.string()
                        .required("Last Name is a required field"),
                    bio: Yup.string().notRequired(),
                    social: Yup.string().notRequired(),
                    insta: Yup.string().notRequired(),
                    facebook: Yup.string().notRequired(),
                    venmo: Yup.string().notRequired(),
                    zelle: Yup.string().notRequired(),
                    email: Yup.string().email('Invalid email address').notRequired(),
                    phone: Yup.string().matches(phoneNumberRegEx, 'Invalid Phone Number').notRequired(),
                    profileImage: Yup.string().notRequired()
                })}
                enableReinitialize={true}
            >
                <Form className="flex w-full gap-10 flex-col lg:flex-row">
                    <div className="lg:basis-1/3 flex flex-col lg:items-end gap-2 lg:gap-5 lg:mt-5 mx-5 lg:mx-0">
                        {Tabs.map(tab => (
                            <button 
                                className={`flex items-center gap-2 px-3 py-2 rounded-md ${selectedTab?.label === tab.label ? "bg-amber-400 text-white" : ""}`}
                                key={tab.label}
                                onClick={() => setSelectedTab(tab)}
                                type="button"
                            >
                                <span>{tab.label}</span>
                                {tab.icon}
                            </button>
                        ))}
                        <hr className="w-full lg:w-36" />
                        <button
                            className="px-3 py-2 bg-green-400 rounded-md text-white drop-shadow-md hover:bg-green-500" 
                            type="submit"
                        >
                            Save Profile
                        </button>
                    </div>
                    <div className="basis-2/3">
                        {selectedTab?.label === "Basic Info" &&
                            <BasicInfo />
                        }
                        {selectedTab?.label === "Payment Info" &&
                            <PaymentInfo />
                        }
                        {selectedTab?.label === "Advanced Settings" &&
                            <AdvancedSettings
                                deleteAccountAction={deleteAccountAction}
                            />
                        }
                    </div>
                </Form>
            </Formik>
            
            <div className={`transition-opacity ${saveToastVisible ? "opacity-100" : "opacity-0"} duration-1000 toast toast-center w-2/3 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg bottom-8`}>
                <div>Your profile has been saved! You can now create an experience.</div>
            </div>
            
        </div>
    )
}