import { Form, Formik } from "formik";
import { Profile } from "packages/db";
import { useEffect, useState } from "react";
import InputField from "~/components/Account/InputField";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
}

export default function GeneralTab() {

  const {data: profileData} = api.profile.getProfile.useQuery();
  const { user } = useUser();
  const [profile, setProfile] = useState({} as Profile | null | undefined);
  const updateClerkInformation = api.profile.updateClerkProfileInformation.useMutation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveToastVisible, setSaveToastVisible] = useState(false);

  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  const handleSubmit = async ({firstName, lastName}: FormValues) => {
    setIsSaving(true);
    await updateClerkInformation.mutateAsync({firstName, lastName});
    setIsSaving(false);
    setSaveToastVisible(true);
    setTimeout(() => {
      setSaveToastVisible(false);
    }, 2000);
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: profile?.firstName || user?.firstName || "",
          lastName: profile?.lastName || user?.lastName || "",
          email: user?.emailAddresses.at(0)?.toString() || ""
        }}
        onSubmit={async (values: FormValues) => {await handleSubmit(values)}}
        enableReinitialize={true}
      >
        <Form className="flex flex-col w-full gap-6">
          <h1 className="font-raleway text-4xl font-bold mb-5 hidden lg:block">General Information</h1>
          <InputField name="firstName" displayName="FIRST NAME" required/>
          <InputField name="lastName" displayName="LAST NAME" required/>
          <InputField name="email" displayName="EMAIL" required disabled/>
          <button type="submit" className="bg-ll-orange rounded-full w-full py-4 text-center text-ll-grey font-inter text-sm flex flex-row items-center justify-center gap-3 lg:w-40 hover:opacity-70">
            <span>Save profile</span><span className={`${isSaving ? "" : "hidden"} loading loading-spinner loading-sm hover:opacity-70`} />
          </button>
        </Form>
      </Formik>

      <div className={`transition-opacity ${saveToastVisible ? "opacity-100" : "opacity-0"} duration-1000 toast toast-center w-28 bg-gradient-to-br text-ll-grey bg-ll-dark-blue rounded-full bottom-8 font-inter text-sm text-center`}>
        <div>Profile saved!</div>
      </div>
    </>
  )
}