import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import BasicProfileInfoTab from "./BasicProfileInfoTab";
import PaymentInfoTab from "./PaymentInfoTab";
import { ErrorMessage, Form, Formik } from "formik";
import CreateFirstEventTab from "./CreateFirstEventTab";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import FinishedTab from "./FinishedTab";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import * as Yup from "yup";
import { getUniqueSlug } from "~/components/common/CreateExperienceButton/CreateExperienceUtils";
import type { Profile } from "@learnedlocal/db";

type HostOnboardFormValues = {
  profileImage: string;
  personalTitle: string;
  bio: string;
  insta: string;
  facebook: string;
  venmo: string;
  zelle: string;
  createNow: string;
  phone: string;
}

export type {HostOnboardFormValues};

export default function HostOnboardFlow() {

  const router = useRouter();
  const [ errors ] = useState("");
  const accountCreator = api.profile.createOrUpdateProfile.useMutation();
  const { data: existingAccountData } = api.profile.getProfile.useQuery();
  const [ existingProfile, setExistingProfile ] = useState({} as Profile | null | undefined);

  const { user } = useUser();

  const [ activeStep, setActiveStep ] = useState(0);
  const [ steps ] = useState([
    <BasicProfileInfoTab key={0} />,
    <PaymentInfoTab key={1}/>,
    <CreateFirstEventTab key={2}/>,
    <FinishedTab key={3}/>
  ] as ReactNode[]);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const validationSchemas = [
    Yup.object({
      personalTitle: Yup.string().required("Please provide a personal title").max(35, "Your personal title is too long, please shorten it to 35 characters or less"),
      bio: Yup.string().required("Please provide a bio").max(700, "Your bio is too long, please shorten it to 700 characters or less"),
      phone: Yup.string().required("Please provide a phone number").max(20, "Please check that you have provided a valid phone number"),

    }),
    Yup.object(),
    Yup.object(),
    Yup.object()
  ];

  useEffect(() => {
    setExistingProfile(existingAccountData);
  }, [existingAccountData]);

  const handleBackClick = () => {
    setActiveStep(isFirstStep ? 0 : activeStep - 1);
  }

  const handleSubmitClick = async (values:HostOnboardFormValues) => {
      
    if (user !== null && user !== undefined) {
      if (activeStep === 0) {
        await accountCreator.mutateAsync({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          personalTitle: values.personalTitle,
          bio: values.bio,
          social: null,
          insta: values.insta,
          facebook: values.facebook,
          venmo: null,
          zelle: null,
          email: user.emailAddresses[0]?.emailAddress || "test@example.com",
          phone: values.phone,
          profileImage: values.profileImage
        });
        setActiveStep(activeStep + 1);
      }
      else if (activeStep === 1) {
        await accountCreator.mutateAsync({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          personalTitle: values.personalTitle,
          bio: values.bio,
          social: null,
          insta: values.insta,
          facebook: values.facebook,
          venmo: values.venmo,
          zelle: values.zelle,
          email: user.emailAddresses[0]?.emailAddress || "test@example.com",
          phone: values.phone,
          profileImage: values.profileImage
        });
        setActiveStep(activeStep + 1);
      }
      else if (activeStep === 2) {
        if (values.createNow === "now") {
          await router.push(`/experience/create/${getUniqueSlug()}`) //Create Experience URL
        }
        else {
          setActiveStep(activeStep + 1);
        }
      }
      else if (activeStep === 3) {
        await router.push("/home");
      }

    }
  }

  return (
    <>
    <div className="w-full max-w-xl flex flex-col flex-1 min-h-screen lg:min-h-0 items-center p-5">    
        <Formik
          initialValues={{
            profileImage: existingProfile?.profileImage || "",
            personalTitle: existingProfile?.personalTitle || "",
            bio: existingProfile?.bio || "",
            insta: existingProfile?.insta || "",
            facebook: existingProfile?.facebook || "",
            venmo: existingProfile?.venmo || "",
            zelle: existingProfile?.zelle || "",
            createNow: "",
            phone: existingProfile?.phone || ""
          }}
          onSubmit={values => handleSubmitClick(values)}
          validationSchema={validationSchemas[activeStep]}
          enableReinitialize={true}
        >
          
          <Form className="w-full flex flex-col items-center gap-2 relative">
            {steps[activeStep]}
            <div className="w-full flex flex-col text-sm items-center text-red-500">
              <ErrorMessage name="personalTitle" component={"div"}/>
              <ErrorMessage name="bio" component={"div"}/>
              <ErrorMessage name="phone" component={"div"}/>
            </div>
            
            <button type="button" hidden={activeStep === 0} className="absolute top-2 left-0 lg:hidden" onClick={() => handleBackClick()}><ChevronLeftIcon width={25}/></button>
            <div className="flex flex-row w-full justify-center gap-3 mt-5">
              <button type="button" onClick={() => handleBackClick()} disabled={activeStep === 0} className="w-full h-12 bg-ll-grey border border-ll-orange font-inter text-sm rounded-full hover:opacity-70 text-ll-black hidden lg:block disabled:opacity-70">Back</button>
              <button type="submit" className="w-full h-12 bg-ll-orange font-inter text-sm rounded-full hover:opacity-70 text-ll-black lg:max-w-xs" data-cy="hostonboardNextButton">{isLastStep ? "Browse Experiences" : "Next"}</button>
            </div>
            <div className="font-inter text-sm text-red-500">{errors}</div>
          </Form>
        </Formik>
      </div>
    </>
  )
}