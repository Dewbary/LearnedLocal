import Image from "next/image";
import { useSearchParams } from "next/navigation";
import textlistGraphic from "../../../assets/textlist/textlist_graphic.png";
import { api } from "~/utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Typography } from "~/components/common/Typography";

type SubscribeValues = {
    phoneNumber: string;
}

const phoneNumberRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function TextList () {

    const searchParams = useSearchParams();
    const router = useRouter();
    const listType = searchParams.get('list');
    const textListAdder = api.textlist.addToTextList.useMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribeClick = async (values: SubscribeValues) => {
        setIsLoading(true);
        await textListAdder.mutateAsync(values.phoneNumber);
        await router.push(`/textlist/survey?phone=${values.phoneNumber}`);
    }

    return (
        <>
            <div className="bg-ll-grey flex flex-col items-center w-full min-h-screen">
                <div className="max-w-sm flex flex-col items-start w-full p-7 gap-5">
                    <div className="w-full flex flex-col items-end">
                        <Link className="w-4 h-4" href="/home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M16.7692 17.6587L8.88464 9.32934L16.7692 1" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.00004 17.8576L8.88464 9.52831L1.00004 1.19897" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full flex flex-col items-center">
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
                        <div className={Typography.PrimaryTitle}>
                            Sign Up
                        </div>
                        <div className={Typography.BodyText}>
                            {listType === "date" ? (
                                "Join our texting list for date night inspiration in Utah County."
                            ) : (
                                "Join our texting list for updates on events tailored to discovering your next passion."
                            )}
                            
                        </div> 
                    </div>
                    
                    <Formik
                        initialValues={{
                            phoneNumber: ""
                        }}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Please enter your phone number").matches(phoneNumberRegEx, 'Invalid phone number')
                        })}
                        onSubmit={handleSubscribeClick}
                    >
                        <Form className="w-full flex flex-col gap-3">
                            <Field name="phoneNumber" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="Phone Number" />
                            <div className="text-red-600">
                                <ErrorMessage name="phoneNumber"/>
                            </div>
                            <button type="submit" disabled={isLoading} className="font-inter bg-ll-black rounded-full flex flex-col items-center py-4 w-full text-ll-grey text-sm disabled:opacity-50">
                                <div className="flex flex-row items-center gap-2">
                                    <span className={Typography.ButtonText}>Sign Up</span>
                                    <span className={`loading loading-spinner loading-xs ${!isLoading ? "hidden" : ""}`} />
                                </div>
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}