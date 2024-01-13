import Footer from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";
import SignInFlow from "~/components/Account/SignInFlow/SignInFlow";

export default function SignIn () {

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