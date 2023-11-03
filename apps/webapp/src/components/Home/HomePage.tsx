import { useUser } from "@clerk/nextjs";
import Modal from "react-modal";
import { useState } from "react";
import ExperiencesDisplay from "~/components/ExperiencesDisplay";
import EmailSignup from "~/components/Home/EmailSignup";
import Register from "~/components/Home/Register";
import SideNav from "~/components/Home/SideNav";
import * as React from "react";
import FilteredExperiencesContext from "~/components/Home/FilteredExperiencesContext";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import AnnouncementWidget from "../common/AnnouncementWidget/AnnouncementWidget";
import FavoritedExperiencesContext from "./FavoritedExperiencesContext";
import { useRouter } from "next/router";
import NewNavBar from "../NewNavBar";
import NewFooter from "../NewFooter";
import Title from "../common/Title";
import ExperienceFilters from "../ExperienceFilters";

Modal.setAppElement("#__next");

const couponCodeAnnouncement: string[] = [];

const HomePage = ({ experiences }: { experiences: ExperienceInfo[] }) => {
  const user = useUser();
  const router = useRouter();
  const { showSubscribeModal } = router.query;

  const [filteredExperiences, setFilteredExperiences] =
    useState<ExperienceInfo[]>(experiences);

  const [favoritedExperiences, setFavoritedExperiences] = useState(
    [] as number[]
  );
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [askForEmail, setAskForEmail] = useState(true);
  const [firstExperienceIdOnDisplay, setFirstExperienceIdOnDisplay] =
    useState(0);

  React.useEffect(() => {
    const saved = localStorage.getItem("favoriteExperiences") as string;
    const initialValue = JSON.parse(saved || "[]") as number[];
    setFavoritedExperiences(initialValue);
    setFavoritesLoaded(true);
  }, []);

  React.useEffect(() => {
    if (favoritesLoaded) {
      localStorage.setItem(
        "favoriteExperiences",
        JSON.stringify(favoritedExperiences)
      );
    }
  }, [favoritedExperiences]);

  React.useEffect(() => {
    setFirstExperienceIdOnDisplay(filteredExperiences.at(0)?.id || 0);
  }, [filteredExperiences]);

  return (
    <FilteredExperiencesContext.Provider
      value={{ filteredExperiences, setFilteredExperiences }}
    >
      <FavoritedExperiencesContext.Provider
        value={{
          favoritedExperiences,
          setFavoritedExperiences,
          askForEmail,
          setAskForEmail,
          firstExperienceIdOnDisplay,
        }}
      >
        <div className="flex min-h-screen flex-col items-center bg-ll-grey">
          <NewNavBar isSignedIn={user.isSignedIn ?? false} />

          <div className="mb-24 mt-28 flex w-11/12 max-w-[100rem] flex-grow flex-col sm:w-3/4">
            <div className="mb-8 font-raleway text-[24px]">
              Discover Experiences
            </div>
            {/* <div className="mb-8">
              <ExperienceFilters />
            </div> */}
            <ExperiencesDisplay />
          </div>

          <NewFooter />
        </div>
      </FavoritedExperiencesContext.Provider>
    </FilteredExperiencesContext.Provider>
  );
};

export default HomePage;

{
  /* <div className="flex min-h-screen w-full flex-col bg-white">
          <NavBar
            isSignedIn={user.isSignedIn ?? false}
            showCreateExperienceButton={true}
            className="bg-white"
          />

          <div className="flex flex-col pt-16 md:pt-0">
            <AnnouncementWidget announcements={couponCodeAnnouncement} />
            <div className="flex flex-col md:flex-row">
              <SideNav
                experiences={experiences}
                onSetExperiences={setFilteredExperiences}
              />
              <div className="flex-1">
                <ExperiencesDisplay />
                <EmailSignup showSubscribeModal={!!showSubscribeModal} />
              </div>
            </div>
            <div className="border-t-2 border-t-slate-100 pt-4">
              <Register />
            </div>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </div> */
}
