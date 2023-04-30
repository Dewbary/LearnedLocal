import React from "react";
import FormPageHeader from "./Typography/Typography";
import { FormikContextType, useFormikContext } from "formik";
import { FormValues } from "./types";
import { uploadImageToBucket } from "~/utils/images";
import { useUser } from "@clerk/nextjs";
import { FormLabel } from "./Form/FormLabel";
import { InputField } from "./Form/InputField";
import { env } from "~/env.mjs";
import process from "process";

const AboutPage = () => {
  const { user } = useUser();

  const { values, setFieldValue }: FormikContextType<FormValues> =
    useFormikContext();

  const handleProfileImageSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || !user) return;

    const imgPath = await uploadImageToBucket(file, user.id);
    console.log(imgPath);
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME
    )
      return;
    const profileImageFilePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME}/${imgPath}`;
    console.log(profileImageFilePath);
    setFieldValue("profileImage", profileImageFilePath);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4">
        <FormPageHeader
          step={2}
          title="We would like to know a little more about you"
          subtitle="As people get to know you, they will be more willing to join your experience"
        />

        <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <div>
            <FormLabel text="FirstName" className="text-gray-600" />
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>

          <div>
            <FormLabel text="LastName" className="text-gray-600" />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <div>
            <FormLabel text="Profile Picture" className="text-gray-600" />

            {values.profileImage && (
              <div className="mx-auto mt-4 mb-8 h-32 w-32">
                <img
                  src={values.profileImage}
                  className="h-full w-full rounded-full object-cover shadow-lg"
                />
              </div>
            )}

            <input
              type="file"
              className="file-input-bordered file-input file-input-sm w-full max-w-xs"
              onChange={(e) => {
                void handleProfileImageSelected(e);
              }}
            />
          </div>

          <div>
            <FormLabel text="Qualifications" className="text-gray-600" />
            <InputField
              id="qualifications"
              name="qualifications"
              type="text"
              placeholder="What qualifies you to create this experience?"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
