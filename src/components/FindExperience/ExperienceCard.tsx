import Image from "next/image";
import ExperienceModalBody from "./ExperienceModalBody";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience } from "@prisma/client";
import profile_pic from "../../assets/profile_pic.png";
import GenericModal from "../GenericModal";

export interface ActionButton {
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
}

export interface ExperienceCardProps {
  experience: Experience;
  actionButtonList?: ActionButton[];
  modalButtonText: string;
  modalHeaderContent: JSX.Element;
  modalBodyContent: JSX.Element;
}

export default function ExperienceCard({ experienceCardProps } : { experienceCardProps: ExperienceCardProps }) {
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
            src={experienceCardProps.experience.photos[0] || ""}
            alt="Picture of the outdoors"
            // className="fill absolute z-0 rounded-2xl fill"
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
            {experienceCardProps.experience.date
              .toLocaleDateString("en-US", dateDisplayOptions)
              .toLocaleUpperCase()}
          </h2>
        </div>
        <div className="absolute h-56 w-full">
          <div className="absolute bottom-0 left-3 w-auto">
            <h2 className="text-2xl font-bold text-white">
              {experienceCardProps.experience.title}
            </h2>
          </div>
        </div>
        <div className="absolute bottom-0 h-36 w-full rounded-b-2xl bg-white p-3">
          <p className="h-16 overflow-hidden text-sm">
            {experienceCardProps.experience.description}
          </p>
          <div className="absolute bottom-5 left-5">
            <p className="text-xl font-bold">${experienceCardProps.experience.price}</p>
          </div>
          <div className="absolute bottom-3 left-24">
            {/* ACTION BUTTON LIST */}
            {experienceCardProps.actionButtonList?.map(actionButton => {
              return (
                <button
                  className={`rounded-lg ${actionButton.buttonColor} text-white drop-shadow-md p-2`}
                  onClick={() => actionButton.buttonAction()}
                >
                  {actionButton.buttonText}
                </button>
              )
            })}
          </div>
          <div className="absolute bottom-3 right-3">
            <button
              className="rounded-lg bg-amber-400 p-2 text-white drop-shadow-md"
              onClick={() => showModal()}
            >
              {experienceCardProps.modalButtonText}
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
          <GenericModal genericModalProps={
            {
              hideModal: hideModal,
              modalContent: experienceCardProps.modalBodyContent,
              modalHeaderContent: experienceCardProps.modalHeaderContent
            }
          } />
        </div>
      </div>
    </>
  );
}

export type { Experience };
