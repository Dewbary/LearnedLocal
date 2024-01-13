import { ErrorMessage, Form, Formik } from "formik";
import { type ReactNode, useEffect, useState } from "react";
import AccountCreationTab from "./AccountCreationTab";
import AccountVerificationTab from "./AccountVerificationTab";
import {useSignUp} from "@clerk/nextjs";
import IntentSurveyTab from "./IntentSurveyTab";
import { useRouter } from "next/router";
import FinishedTab from "./FinishedTab";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";

type SignupFlowFormValues = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  oneTimeCode: string;
  host: string;
}

export type { SignupFlowFormValues };

export default function SignUpFlow() {

  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oAuthRedirect = searchParams.get("oauthredirect") === "true";
  const postCreationRedirect = searchParams.get("redirect_url");

  useEffect(() => {
    setActiveStep(oAuthRedirect ? 2 : 0);
  }, [oAuthRedirect]);

  const [ errors, setErrors ] = useState("");

  const [ activeStep, setActiveStep ] = useState(0);
  const [ steps ] = useState([
    <AccountCreationTab key={0}/>,
    <AccountVerificationTab key={1}/>,
    <IntentSurveyTab key={2}/>,
    <FinishedTab key={3}/>
  ] as ReactNode[]);

  // MAKE SURE YOU ADD A VALIDATION SCHEMA IF YOU ADD A STEP TO THE SIGNUP FLOW

  const validationSchemas = [
    Yup.object({
      firstName: Yup.string().required("You need to provide a first name"),
      lastName: Yup.string().required("You need to provide a last name"),
      emailAddress: Yup.string().email("Please enter a valid email").required("You need to provide an email"),
      password: Yup.string().required("You need to provide a password")
    }),
    Yup.object(),
    Yup.object(),
    Yup.object()
  ]

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  const handleBackClick = () => {
    setActiveStep(isFirstStep ? 0 : activeStep - 1);
  }

  const signUpNewUser = async function (emailAddress: string, password: string, firstName: string, lastName: string) {
    await signUp?.create({emailAddress, password, firstName, lastName})
    .then(async result => {
      setErrors("");
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
      else if (result.status === "missing_requirements" && result.requiredFields.includes("email_address")) {
        await result.prepareEmailAddressVerification();
        setActiveStep(activeStep + 1);
      }
      else {
        console.log(result);
      }
    }).catch(err => {
      // eslint-disable-next-line
      setErrors(`Error: ${err.errors.at(0).message}`);
    })
  }

  const verifyEmail = async function (oneTimeCode: string) {
    await signUp?.attemptEmailAddressVerification({ code: oneTimeCode })
      .then(async result => {
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          if (postCreationRedirect && postCreationRedirect.length > 1) {
            await router.push(postCreationRedirect);
          }
          setActiveStep(activeStep + 1);
          setErrors("");
        }
        else {
          console.log(result);
        }
      }).catch(err => {
        // eslint-disable-next-line
        setErrors(`Error: ${err.errors.at(0).message === 'is incorrect' ? "Incorrect code" : "Too many failed attempts. Try a different method."}`);
      });
  }

  const submitSurvey = async function (host: string) {
    console.log(host);
    if (host === "guest") {
      setActiveStep(activeStep + 1);
    }
    else if (host === "host" || host === "both") {
      await router.push("/account/hostonboard");
    }
  }

  const finishFlow = async function () {
    await router.push("/home");
  }

  const handleSubmitClick = async (values:SignupFlowFormValues) => {
    if (isLastStep) {
      await finishFlow();
    }
    else {
      if (activeStep === 0) {
        await signUpNewUser(values.emailAddress, values.password, values.firstName, values.lastName);
      }
      else if (activeStep === 1) {
        await verifyEmail(values.oneTimeCode);
      }
      else if (activeStep === 2) {
        await submitSurvey(values.host);
      }
    }
  }

  return (
    <>
      <div className="w-full max-w-xl flex flex-col items-center p-5 min-h-screen lg:min-h-0 flex-1">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            oneTimeCode: "",
            host: ""
          }}
          onSubmit={values => handleSubmitClick(values)}
          validationSchema={validationSchemas[activeStep]}
        >
          <Form className="w-full flex flex-col items-center gap-2 relative">
            {steps[activeStep]}
            <button type="button" hidden={oAuthRedirect && activeStep === 2 || activeStep === 0} className="absolute top-2 left-0 lg:hidden" onClick={() => handleBackClick()}><ChevronLeftIcon width={25}/></button>
            <div className="flex flex-row w-full justify-center gap-3 mt-5">
              <button type="button" onClick={() => handleBackClick()} disabled={oAuthRedirect && activeStep === 2 || activeStep === 0} className="w-full h-12 bg-ll-grey border border-ll-orange font-inter text-sm rounded-full hover:opacity-70 text-ll-black hidden lg:block disabled:opacity-70">Back</button>
              <button type="submit" className="w-full h-12 bg-ll-orange font-inter text-sm rounded-full hover:opacity-70 text-ll-black lg:max-w-xs">{isLastStep ? "Browse Experiences" : "Next"}</button>
            </div>
            <div className="font-inter text-sm text-red-500">{errors}</div>
            <div className="font-inter text-sm text-red-500">
              <ErrorMessage name="firstName" component={"div"} />
              <ErrorMessage name="lastName" component={"div"} />
              <ErrorMessage name="emailAddress" component={"div"} />
              <ErrorMessage name="password" component={"div"} />
            </div>
            <p className="text-ll-dark-grey font-inter text-sm" hidden={activeStep > 1}>Already have an account? <Link href="/account/signin" className=" text-ll-blue">Login</Link></p>  
          </Form>
        </Formik>
      </div>
    </>
  )
}