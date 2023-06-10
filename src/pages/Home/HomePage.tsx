import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useState } from "react";
import ExperiencesDisplay from "~/components/ViewExperience/ExperiencesDisplay";
import EmailSignup from "~/components/Email/EmailSignup";
import Register from "~/components/Register";

Modal.setAppElement("#__next");

const HomePage = () => {
  const user = useUser();
  const experiencesQuery = api.experience.getAll.useQuery();

  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigateToHosting = async function () {
    await router.push("/host");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to the start of the day

  const upcomingExperienceIds = [30, 32, 33, 34];

  const currentExperiences =
    experiencesQuery.data
      ?.filter((experience) => new Date(experience.date) >= today)
      .filter((experience) => !upcomingExperienceIds.includes(experience.id)) ||
    [];

  const upcomingExperiences =
    experiencesQuery.data?.filter((experience) =>
      upcomingExperienceIds.includes(experience.id)
    ) || [];

  const pastExperiences =
    experiencesQuery.data?.filter(
      (experience) =>
        new Date(experience.date) < today &&
        !upcomingExperienceIds.includes(experience.id)
    ) || [];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar isSignedIn={user.isSignedIn ?? false} className="" />

      <div className="pt-16 md:pt-0">
        {/* <Header /> */}

        <ExperiencesDisplay experiences={experiencesQuery.data ?? []} />
        {/* <EmailSignup /> */}

        <div className="divider px-16"></div>

        {/* <Register /> */}

        <div className="divider px-16"></div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
