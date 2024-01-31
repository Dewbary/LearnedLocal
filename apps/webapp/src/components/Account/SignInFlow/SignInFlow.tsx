import { Form, Formik } from "formik";
import InputField from "../InputField";
import Image from "next/image";
import googleIcon from "../../../../assets/google-icon.png";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Typography } from "~/components/common/Typography";

type FormValues = {
  emailAddress: string;
  password: string;
}

export default function SignInFlow() {

  const { signIn, setActive } = useSignIn();
  const [ errors, setErrors ] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirect_url");

  const handleSubmitClick = async (values: FormValues) => {
    await signInUser(values.emailAddress, values.password);
  }

  const signInUser = async (emailAddress: string, password: string) => {
    await signIn?.create({
      identifier: emailAddress,
      strategy: "password", 
      password,
    }).then(async result => {
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        await router.push(redirectUrl || "/");
      }
      else {
        console.log(result);
      }
    }).catch(err => {
      // eslint-disable-next-line
      setErrors(`Error: ${err.errors.at(0).message}`);
    })
  }

  const handleGoogleAuthClick = async () => {
    await signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback?redirect-url=%2F",
      redirectUrlComplete: redirectUrl && redirectUrl.length > 1 ? redirectUrl : "/home"
    });
  }

  return (
    <>
      <div className="w-full max-w-xl flex flex-col items-center p-5 min-h-screen lg:min-h-0 flex-1">
        <Formik
          initialValues={{
            emailAddress: "",
            password: ""
          }}
          onSubmit={(values:FormValues) => handleSubmitClick(values)}
        >
          <Form className="w-full flex flex-col items-center gap-4 relative">
            <h1 className="mb-3">
              <span className={Typography.PrimaryTitle}>
                Sign in to Learned Local
              </span>
            </h1>
            <InputField name="emailAddress" displayName="EMAIL" cyTestData="emailField" />
            <InputField name="password" displayName="PASSWORD" type="password"  cyTestData="passwordField"/>
            <div className="font-inter text-sm text-red-500">{errors}</div>
            <button type="button" className="w-full bg-white h-12 rounded-full flex flex-row items-center justify-center gap-3" onClick={() => handleGoogleAuthClick()}>
              <span className={Typography.ButtonText}>Sign In with Google</span>
              <Image
                src={googleIcon}
                alt="Google Icon"
                width={30}
                height={30}
              />
            </button>
            <button type="submit" className="w-full h-12 bg-ll-orange rounded-full hover:opacity-70 text-ll-black" data-cy="signInWithEmailButton">
              <span className={Typography.ButtonText}>Sign In</span>
            </button>
            <div className={Typography.BodyText}>Don&apos;t have an account? <Link href={`/account/signup?redirect_url=${encodeURIComponent(redirectUrl || "")}`} className="text-ll-dark-blue border-b-ll-dark-blue border-b">Click here</Link> to create one!</div>
          </Form>
        </Formik>
      </div>
    </>
  )
}