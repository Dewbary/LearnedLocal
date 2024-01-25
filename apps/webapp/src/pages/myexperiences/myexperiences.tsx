import MyExperiencesPage from "~/components/MyExperiences/MyExperiencesPage";
import NewFooter from "~/components/NewFooter";
import NewNavBar from "~/components/NewNavBar";

export default function MyExperiences() {
  return (
    <>
      <div className="w-full bg-ll-grey flex flex-col min-h-screen items-center">
        <NewNavBar />
        <MyExperiencesPage />
        <NewFooter />
      </div>
    </>
  );
}