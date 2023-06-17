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
import VideoPlayer from "~/components/VideoPlayer/VideoPlayer";

Modal.setAppElement("#__next");

const HomePage = () => {
  const user = useUser();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to the start of the day

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-ll-gray" />

      <div className="pt-16 md:pt-0">
        <Header />

        <ExperiencesDisplay today={today} />

        <EmailSignup
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />

        <div className="divider px-16"></div>

        <div className="mx-10 my-10 flex flex-col items-center">
          <span id="aboutlearnedlocal" />
          <h2 className="text-center text-4xl font-bold lg:text-7xl">
            What is Learned Local?
          </h2>
          <p className="mt-6 text-left text-xl lg:mx-24">
            Having a hard time thinking of date night ideas? Looking for fun
            things to do in Utah and Provo? Why not learn a new hobby from a
            talented individual or business right where you live? Come find an
            experience and create a memory with us while building a stronger
            sense of community!
          </p>
          <p className="mt-6 text-left text-xl lg:mx-24">
            We believe that everyone has hobbies, passions, and interests that
            makes them unique. We made Learned Local as a place for members of
            your community to come together and share these interests with each
            other, in events that we like to call &quot;experiences&quot;. Along
            the way, you&apos;ll forge friendships, create memories, and
            discover that you have a lot more in common with the people around
            you than you think. Sign up for an experience today!
          </p>

          <VideoPlayer />
        </div>

        <div className="divider px-16"></div>

        <Register />

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
