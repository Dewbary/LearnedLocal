import { Field } from "formik";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { Typography } from "~/components/common/Typography";

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
        <h1 className="text-center mb-5 w-72 lg:w-full lg:mb-8">
          <span className={Typography.PrimaryTitle}>
            Verify your email address
          </span>
        </h1>
        <h2 className={Typography.BodyText}>Check your email inbox for a code, and enter that code here.</h2>
        <Field name="oneTimeCode" className="w-full bg-ll-grey p-3 border border-gray-400 rounded-lg" />
        <button type="button" className="w-full bg-white rounded-full h-12" onClick={() => handleResendCodeClick()}>
          <span className={Typography.ButtonText}>
            Resend code
          </span>
        </button>
        <div>{codeSent ? "Code Sent!" : ""}</div>
      </div>
      
    </>
  )
}