import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";
import Modal from "react-modal";
import { useState } from "react";
import ExperiencesDisplay from "~/components/ViewExperience/ExperiencesDisplay";
import EmailSignup from "~/components/Email/EmailSignup";
import Register from "~/components/Register";
import SideNav from "~/components/SideNav";
import * as React from "react";
import FilteredExperiencesContext from "~/components/ViewExperience/FilteredExperiencesContext";
import { getExperiences } from "~/components/ViewExperience/ViewExperienceUtils";
import { ExperienceInfo } from "~/components/types";

Modal.setAppElement("#__next");

const HomePage = () => {
  const user = useUser();
  const experiencesQuery = api.experience.getAll.useQuery();
  // const experiencesQuery = api.experience.getCurrent.useQuery();

  const [experiences, setExperiences] = useState<ExperienceInfo[]>(
    experiencesQuery.data ?? []
  );
  const [filteredExperiences, setFilteredExperiences] = useState<
    ExperienceInfo[]
  >(experiencesQuery.data ?? []);

  React.useEffect(() => {
    setExperiences(experiencesQuery.data ?? []);
    console.log("experiencesQuery", experiencesQuery.data);
    setFilteredExperiences(
      getExperiences("Current", experiencesQuery.data ?? [])
    );
    // setFilteredExperiences(experiencesQuery.data ?? []);
  }, [experiencesQuery.isLoading]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <FilteredExperiencesContext.Provider
      value={{ filteredExperiences, setFilteredExperiences }}
    >
      <div className="flex min-h-screen w-full flex-col bg-white">
        <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-white" />

        <div className="flex flex-col pt-16 md:pt-0">
          <div className="flex flex-col md:flex-row">
            <SideNav
              experiences={experiences}
              onSetExperiences={setFilteredExperiences}
            />
            <div className="flex-1">
              <ExperiencesDisplay isLoading={experiencesQuery.isLoading} />
              <EmailSignup
                modalIsOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            </div>
          </div>
          <div className="border-t-2 border-t-slate-100 pt-4">
            <Register />
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </FilteredExperiencesContext.Provider>
  );
};

export default HomePage;
