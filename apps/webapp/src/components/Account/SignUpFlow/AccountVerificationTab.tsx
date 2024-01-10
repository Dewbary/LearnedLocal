import { Field } from "formik";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function AccountVerificationTab() {

  const { signUp } = useSignUp();
  const [ codeSent, setCodeSent ] = useState(false);

  const handleResendCodeClick = async () => {
    await signUp?.prepareEmailAddressVerification();
    setCodeSent(true);
  }

  return (
    <>
      <div className="flex flex-col w-full items-center gap-3">
        <h1 className="font-raleway font-bold text-3xl text-center mb-5 w-72 lg:w-full lg:text-4xl lg:mb-8">Verify your email address</h1>
        <h2>Check your email inbox for a code, and enter that code here.</h2>
        <Field name="oneTimeCode" className="w-full bg-ll-grey p-3 border border-gray-400 rounded-lg" />
        <button type="button" className="w-full bg-white rounded-full h-12 text-sm" onClick={() => handleResendCodeClick()}>Resend code</button>
        <div>{codeSent ? "Code Sent!" : ""}</div>
      </div>
      
    </>
  )
}