import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";
import { Profile } from "packages/db";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "~/components/Account/InputField";
import PhotoUploadComponent from "~/components/Account/PhotoUploadComponent";
import { api } from "~/utils/api";

type FormValues = {
  profileImage: string;
  personalTitle: string;
  bio: string;
  phone: string;
  insta: string;
  facebook: string;
  venmo: string;
  zelle: string;
}

export default function HostInfoTab() {

  const [isSaving, setIsSaving] = useState(false);
  const [saveToastVisible, setSaveToastVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({} as Profile | null | undefined);
  const { data:userProfileInfo, status } = api.profile.getProfile.useQuery();
  const profileUpdater = api.profile.createOrUpdateProfile.useMutation();

  useEffect(() => {
    setUserProfile(userProfileInfo);
  }, [userProfileInfo]);

  const handleSubmit = async ({profileImage, personalTitle, bio, phone, insta, facebook, venmo, zelle}: FormValues) => {
    setIsSaving(true);
    await profileUpdater.mutateAsync({
      firstName: "",
      lastName: "",
      email: "",
      social: "",
      profileImage,
      personalTitle,
      bio,
      phone,
      insta,
      facebook,
      venmo,
      zelle
    });
    setIsSaving(false);
    setSaveToastVisible(true);
    setTimeout(() => {
      setSaveToastVisible(false);
    }, 2000);
  }

  return (
    <>
      {userProfile?.email === undefined || userProfile?.email === null ? (
        <div className="flex flex-col gap-6">
          <h1 className="font-raleway text-4xl font-bold mb-5 hidden lg:block">Host with Learned Local</h1>
          <p className="font-inter">
            Want to become a host? Click below to get started setting up your hosting profile!
          </p>
          <Link href="/account/hostonboard" className="bg-ll-orange hover:opacity-70 rounded-full px-4 py-3 text-sm font-inter w-fit block">
            Create host profile
          </Link>
        </div>
      ) : (
        <>
          <Formik
            initialValues={{
              profileImage: userProfile?.profileImage || "",
              personalTitle: userProfile?.personalTitle || "",
              bio: userProfile?.bio || "",
              phone: userProfile?.phone || "",
              insta: userProfile?.insta || "",
              facebook: userProfile?.facebook || "",
              venmo: userProfile?.venmo || "",
              zelle: userProfile?.zelle || ""
            }}
            onSubmit={async (values: FormValues) => {await handleSubmit(values)}}
            validationSchema={Yup.object({
              personalTitle: Yup.string().required("Please provide a personal title").max(35, "Your personal title is too long, please shorten it to 35 characters or less"),
              bio: Yup.string().required("Please provide a bio").max(700, "Your bio is too long, please shorten it to 700 characters or less"),
              phone: Yup.string().required("Please provide a phone number").max(20, "Please check that you have provided a valid phone number"),
            })}
            enableReinitialize={true}
          >
            <Form className="flex flex-col w-full gap-6">
              <h1 className="font-raleway text-4xl font-bold mb-5 hidden lg:block">Hosting Profile</h1>
              <PhotoUploadComponent name="profileImage" />
              <InputField name="personalTitle" displayName="PROFILE TAGLINE" placeholder="Art enthusiast, pastry chef, etc." note="Maximum 35 characters" required={true} cyTestData="personalTitleField"/>
              <InputField name="bio" displayName="BIO" placeholder="Tell your users a little about your background and interests" as="textarea" note="Maximum 700 characters" required={true} cyTestData="bioField"/>
              <InputField name="insta" displayName="INSTAGRAM HANDLE" placeholder="@learnedlocal" cyTestData="instaField"/>
              <InputField name="facebook" displayName="FACEBOOK PROFILE LINK" placeholder="facebook.com/your_page_link" cyTestData="facebookField"/>
              <InputField name="phone" displayName="PHONE NUMBER" placeholder="801-123-4567" required={true} cyTestData="phoneField"/> 
              <div className="font-inter text-sm text-red-500">
                <ErrorMessage name="personalTitle" component={"div"}/>
                <ErrorMessage name="bio" component={"div"}/>
                <ErrorMessage name="phone" component={"div"}/>
              </div>
              <button type="submit" className="bg-ll-orange rounded-full w-full py-4 text-center text-ll-grey font-inter text-sm flex flex-row items-center justify-center gap-3 disabled:bg-gray-400 lg:w-40 hover:opacity-70">
                <span>Save Profile</span><span className={`${isSaving ? "" : "hidden"} loading loading-spinner loading-sm hover:opacity-70`} />
              </button>
            </Form>
          </Formik>

          <div className={`transition-opacity ${saveToastVisible ? "opacity-100" : "opacity-0"} duration-1000 toast toast-center w-28 bg-gradient-to-br text-ll-grey bg-ll-dark-blue rounded-full bottom-8 font-inter text-sm text-center`}>
            <div>Profile Saved!</div>
          </div>
        </>
      )}
      
    </>
  )
}