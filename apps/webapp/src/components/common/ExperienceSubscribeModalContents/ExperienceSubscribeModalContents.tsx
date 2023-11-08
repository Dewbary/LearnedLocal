import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import Image from "next/image";
import textlistGraphic from "../../../../assets/textlist/textlist_graphic.png";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { api } from "~/utils/api";

type Props = {
  experienceInfo: ExperienceInfo;
};

type FormVals = {
    newContactFirstName: string;
    newContactLastName: string;
    newContactEmail: string;
    newContactPhoneNumber: string;
}

const phoneNumberRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function ExperienceSubscribeModalContents(props: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const signUpForWaitlist = api.email.signUpForWaitlist.useMutation();

  const handleSubscribeClick = async (vals:FormVals) => {
    setIsLoading(true);
    await signUpForWaitlist.mutateAsync({...vals, experienceTitle: props.experienceInfo.title})
    setIsLoading(false);
    setIsSubscribed(true);
  }

  return (
    <div className="flex flex-col flex-1 pt-16 items-start w-full px-7 gap-5 bg-ll-grey pb-14 max-w-xl self-center">
        <div className="w-full flex flex-col items-center max-w-xs self-center">
            <div className="w-44 aspect-w-2 aspect-h-1">
                <Image
                    src={textlistGraphic}
                    alt={"A phone with some texts"}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <div className="text-2xl font-raleway font-bold">
                Sign Up for {props.experienceInfo.title}
            </div>
            <div className="font-inter">
              We&apos;ll let you know when this experience is available for signups.
            </div> 
        </div>
        
        <Formik
            initialValues={{
                newContactPhoneNumber: "",
                newContactFirstName: "",
                newContactLastName: "",
                newContactEmail: ""
            }}
            validationSchema={Yup.object({
                newContactFirstName: Yup.string().required("Please enter your first name"),
                newContactLastName: Yup.string().required("Please enter your last name"),
                newContactEmail: Yup.string().email("Invalid email address").required("Please enter your email"),
                newContactPhoneNumber: Yup.string().required("Please enter your phone number").matches(phoneNumberRegEx, 'Invalid phone number')
            })}
            onSubmit={handleSubscribeClick}
        >
            <Form className="w-full flex flex-col gap-7 justify-between">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="">
                        <Field name="newContactFirstName" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="First Name" />
                        <div className="text-red-600">
                            <ErrorMessage name="newContactFirstName"/>
                        </div>
                    </div>
                    <div className="">
                        <Field name="newContactLastName" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="Last Name" />
                        <div className="text-red-600">
                            <ErrorMessage name="newContactLastName"/>
                        </div>
                    </div>
                    <div className="w-full">
                        <Field name="newContactEmail" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="Email" />
                        <div className="text-red-600">
                            <ErrorMessage name="newContactEmail"/>
                        </div>
                    </div>
                    <div className="w-full">
                        <Field name="newContactPhoneNumber" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="Phone Number" />
                        <div className="text-red-600">
                            <ErrorMessage name="newContactPhoneNumber"/>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={isLoading || isSubscribed} className={`${!isSubscribed ? "bg-ll-black disabled:opacity-50" : "bg-ll-dark-green"} font-inter transition-all rounded-full flex flex-col items-center py-4 w-full max-w-xs self-center text-ll-grey text-sm`}>
                    <div className="flex flex-row items-center gap-2">
                        {!isSubscribed ? "Sign Up" : "Success!"}
                        <span className={`loading loading-spinner loading-xs ${!isLoading ? "hidden" : ""}`} />
                    </div>
                </button>
            </Form>
        </Formik>
    </div>
  );
}
