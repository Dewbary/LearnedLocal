import NewProfileContents from "~/components/Account/Profile/ProfileContents";
import Footer from "~/components/NewFooter/NewFooter";
import NewNavBar from "~/components/NewNavBar";

export default function NewProfile() {
  return (
    <>
      <div className="bg-ll-grey w-full min-h-screen flex flex-col items-center">
        <NewNavBar />
        <NewProfileContents />
        <Footer />
      </div>
    </>
  )
}