import { useSignUp } from "@clerk/nextjs";
import InputField from "../InputField";
import googleIcon from "../../../../assets/google-icon.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Typography } from "~/components/common/Typography";

export default function AccountCreationTab() {

  const { signUp } = useSignUp();
  const searchParams = useSearchParams();
  const postCreationRedirect = searchParams.get("redirect_url");

  const handleGoogleAuthClick = async () => {
    await signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: postCreationRedirect && postCreationRedirect.length > 1 ? postCreationRedirect : "/account/signup?oauthredirect=true"
    });
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-5">
        <h1 className="text-center mb-5 w-72 lg:w-full lg:mb-8">
          <span className={Typography.PrimaryTitle}>
            Create account
          </span>
        </h1>
        <InputField name="firstName" displayName="FIRST NAME" required={true}/>
        <InputField name="lastName" displayName="LAST NAME" required={true}/>
        <InputField name="emailAddress" displayName="EMAIL" type="email" required={true}/>
        <InputField name="password" displayName="PASSWORD" type="password" note="Minimum 8 characters" required={true}/>
        <button type="button" className="w-full bg-white h-12 text-sm rounded-full flex flex-row items-center justify-center gap-3" onClick={() => handleGoogleAuthClick()}>
          <span className={Typography.ButtonText}>
            Sign up with Google
          </span>
          <Image
            src={googleIcon}
            alt="Google Icon"
            width={30}
            height={30}
          />
        </button>
      </div>
    </>
  )
}