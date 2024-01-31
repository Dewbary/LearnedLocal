import Modal from "react-modal";
import { useState } from "react";
import ExperiencesDisplay from "~/components/ExperiencesDisplay";
import * as React from "react";
import FilteredExperiencesContext from "~/components/Home/FilteredExperiencesContext";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import FavoritedExperiencesContext from "./FavoritedExperiencesContext";
import NewNavBar from "../NewNavBar";
import NewFooter from "../NewFooter";
import ExperienceFilters from "../ExperienceFilters";
import { Typography } from "../common/Typography";

Modal.setAppElement("#__next");

const HomePage = ({ experiences }: { experiences: ExperienceInfo[] }) => {

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
  }, [favoritedExperiences, favoritesLoaded]);

  React.useEffect(() => {
    setFirstExperienceIdOnDisplay(filteredExperiences.at(0)?.id || 0);
  }, [filteredExperiences]);

  return (
    <FilteredExperiencesContext.Provider
      value={{
        filteredExperiences,
        allExperiences: experiences,
        setFilteredExperiences,
      }}
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
          <NewNavBar />

          <div className="mb-24 flex w-11/12 max-w-[100rem] flex-grow flex-col gap-8 sm:w-3/4 py-5">
            <div className={Typography.PrimaryTitle}>
              Discover Experiences
            </div>
            <div>
              <ExperienceFilters />
            </div>
            <ExperiencesDisplay />
          </div>

          <NewFooter />
        </div>
      </FavoritedExperiencesContext.Provider>
    </FilteredExperiencesContext.Provider>
  );
};

export default HomePage;
