import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import clipboardGraphic from "../../../../assets/textlist/clipboard_graphic.png"
import { api } from "~/utils/api";

type SurveyValues = {
    astronomy: boolean;
    blacksmithing: boolean;
    baking: boolean;
    car: boolean;
    gardening: boolean;
    sewing: boolean;
    language: boolean;
    instrument: boolean;
    painting: boolean;
    photography: boolean;
    pottery: boolean;
    climbing: boolean;
    sailing: boolean;
    snowboarding: boolean;
    sports: boolean;
    yoga: boolean;
}

export default function Survey() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get("phone") || "";
    const [isLoading, setIsLoading] = useState(false);
    const recordSurveyResults = api.textlist.recordHobbyPreferences.useMutation();

    const handleFinishSurveyClick = async (values: SurveyValues) => {
        setIsLoading(true);
        await recordSurveyResults.mutateAsync({phoneNumber, ...values});
        router.push("/textlist/confirm");
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
                    <div className="w-full flex flex-col items-center pb-3">
                        <div className="w-44 aspect-w-2 aspect-h-1">
                            <Image
                                src={clipboardGraphic}
                                alt={"A phone with some texts"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-2xl font-raleway font-bold">
                            Which activities appeal to you the most?
                        </div>
                    </div>
                    
                    <Formik
                        initialValues={{
                            astronomy: false,
                            blacksmithing: false,
                            baking: false,
                            car: false,
                            gardening: false,
                            sewing: false,
                            language: false,
                            instrument: false,
                            painting: false,
                            pottery: false,
                            photography: false,
                            climbing: false,
                            sailing: false,
                            snowboarding: false,
                            sports: false,
                            yoga: false,
                        }}
                        onSubmit={handleFinishSurveyClick}
                    >
                        <Form className="w-full flex flex-col gap-3">
                            <div className="flex flex-col gap-5 pl-7 pb-5">
                                <ActivityCheckbox activity="Astronomy" checkboxName="astronomy" />
                                <ActivityCheckbox activity="Blacksmithing" checkboxName="blacksmithing" />
                                <ActivityCheckbox activity="Baking or cooking" checkboxName="baking" />
                                <ActivityCheckbox activity="Car maintenance" checkboxName="car" />
                                <ActivityCheckbox activity="Gardening" checkboxName="gardening" />
                                <ActivityCheckbox activity="Knitting or sewing" checkboxName="sewing" />
                                <ActivityCheckbox activity="Learning a language" checkboxName="language" />
                                <ActivityCheckbox activity="Learning an instrument" checkboxName="instrument" />
                                <ActivityCheckbox activity="Painting" checkboxName="painting" />
                                <ActivityCheckbox activity="Photography" checkboxName="photography" />
                                <ActivityCheckbox activity="Pottery" checkboxName="pottery" />
                                <ActivityCheckbox activity="Rock Climbing" checkboxName="climbing" />
                                <ActivityCheckbox activity="Sailing" checkboxName="sailing" />
                                <ActivityCheckbox activity="Skiing or snowboarding" checkboxName="snowboarding" />
                                <ActivityCheckbox activity="Sports" checkboxName="sports" />
                                <ActivityCheckbox activity="Yoga" checkboxName="yoga" />
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

const ActivityCheckbox = ({activity, checkboxName}: {activity:string, checkboxName: string}) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <Field name={checkboxName} type="checkbox" className="checkbox rounded-md"/>
            <span>{activity}</span>
        </div>
    )
}