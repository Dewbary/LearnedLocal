import Footer from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";
import { useUser } from "@clerk/nextjs";
import SignInFlow from "~/components/Account/SignInFlow/SignInFlow";

export default function SignIn () {

  const { isSignedIn } = useUser();

  return (
    <>
      <div className="bg-ll-grey min-h-screen w-full flex flex-col items-center">
        <NewNavBar />
        <SignInFlow />
        <Footer />
      </div>
    </>
  )
}