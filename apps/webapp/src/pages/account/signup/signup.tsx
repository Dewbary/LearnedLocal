import SignUpFlow from "~/components/Account/SignUpFlow/SignUpFlow";
import NewNavBar from "~/components/NewNavBar";
import Footer from "~/components/NewFooter/NewFooter";

export default function SignUp() {

  return (
    <>
      <div className="bg-ll-grey min-h-screen w-full flex flex-col items-center">
        <NewNavBar />
        <SignUpFlow />
        <Footer />
      </div>
      
    </>
  )
}