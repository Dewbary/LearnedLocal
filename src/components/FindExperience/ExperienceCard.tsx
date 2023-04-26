import Image from "next/image";
import outdoors from "../../assets/outdoors.jpg";
import ExperienceModal from "./ExperienceModal";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience } from "@prisma/client";
import profile_pic from "../../assets/profile_pic.png";

type Props = {
  experience: Experience;
};

const ExperienceCard = ({ experience }: Props) => {
  const [modalHidden, setModalHidden] = useState(true);

  const dateDisplayOptions = {
    month: "short",
    day: "2-digit",
  } as const;

  const showModal = function () {
    setModalHidden(false);
  };

  const hideModal = function () {
    setModalHidden(true);
  };

  return (
    <>
      <div className="h-96 w-72 rounded-2xl drop-shadow-xl">
        <div className="absolute top-0 left-0 h-96 w-full">
          <img
            src={experience.photos[0] || ""}
            alt="Picture of the outdoors"
            className="absolute inset-0 z-0 h-full w-full rounded-2xl object-cover"
          />
        </div>
        <div className="absolute top-4 left-4 text-white">
          <Image
            src={profile_pic}
            alt="Profile Picture Anonymous"
            width={40}
            className="rounded-full border border-white"
          />
        </div>
        <div className="absolute top-3 right-3">
          <h2 className="text-4xl font-bold text-white">
            {experience.date
              .toLocaleDateString("en-US", dateDisplayOptions)
              .toLocaleUpperCase()}
          </h2>
        </div>
        <div className="absolute h-56 w-full">
          <div className="absolute bottom-0 left-3 w-auto">
            <h2 className="text-2xl font-bold text-white">
              {experience.title}
            </h2>
          </div>
        </div>
        <div className="absolute bottom-0 h-36 w-full rounded-b-2xl bg-white p-3">
          <p className="h-16 overflow-hidden text-sm">
            {experience.description}
          </p>
          <div className="absolute bottom-5 left-5">
            <p className="text-xl font-bold">${experience.price}</p>
          </div>
          <div className="absolute bottom-3 right-3">
            <button
              className="rounded-lg bg-amber-400 p-2 text-white drop-shadow-md"
              onClick={() => showModal()}
            >
              Details
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50 ${
          modalHidden ? styles["modal-hidden"] : styles["modal-visible"]
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <ExperienceModal hideModal={hideModal} experience={experience} />
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
