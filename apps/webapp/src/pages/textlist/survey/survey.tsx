import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

type SurveyValues = {
    activity: string;
}

export default function Survey() {

    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get("phone");
    const [isLoading, setIsLoading] = useState(false);

    const handleFinishSurveyClick = (values: SurveyValues) => {
        console.log("Clicked!");
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
                                src={""}
                                alt={"A phone with some texts"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl font-raleway">
                            Which activities appeal to you the most?
                        </div>
                    </div>
                    
                    <Formik
                        initialValues={{
                            activity: ""
                        }}
                        onSubmit={handleFinishSurveyClick}
                    >
                        <Form className="w-full flex flex-col gap-3">
                            <Field name="phoneNumber" className="w-full border border-gray-400 bg-ll-grey p-4 text-sm rounded-md" placeholder="Phone Number" />
                            <div className="text-red-600">
                                <ErrorMessage name="phoneNumber"/>
                            </div>
                            <button type="submit" disabled={isLoading} className="font-inter bg-ll-black rounded-full flex flex-col items-center py-4 w-full text-ll-grey text-sm disabled:opacity-50">
                                <div className="flex flex-row items-center gap-2">
                                    Finish
                                    <span className={`loading loading-spinner loading-xs ${!isLoading ? "hidden" : ""}`} />
                                </div>
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}