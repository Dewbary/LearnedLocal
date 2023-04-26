import Image from "next/image";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience } from "@prisma/client";
import profile_pic from "../../assets/profile_pic.png";
import GenericModal from "../GenericModal";
import outdoors from "../../assets/outdoors.jpg"

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
      <div className="h-96 w-72 rounded-2xl bg-white drop-shadow-xl flex flex-col">

        {/* TITLE BAR */}
        <div className="flex justify-between w-full items-center p-3 bg-gradient-to-br from-amber-300 to-amber-400 rounded-t-2xl">
          <Image
              src={profile_pic}
              alt="Profile Picture Anonymous"
              width={40}
              className="rounded-full"
            />
            <h2 className="text-4xl font-bold">
              {experienceCardProps.experience.date
                .toLocaleDateString("en-US", dateDisplayOptions)
                .toLocaleUpperCase()}
            </h2>
        </div>

        {/* COVER IMAGE */}
        <div className="w-full overflow-hidden">
          <img
            src={experienceCardProps.experience.photos[0] || ""}
          />
          {/* <Image
            src={outdoors} //{experienceCardProps.experience.photos[0] || ""}
            alt="Picture of the outdoors"
            // className="fill absolute z-0 rounded-2xl fill"
            className=""
          /> */}
        </div>

        {/* DESCRIPTION BOX */}
        <div className="px-3">
          <h2 className="text-2xl font-bold">
            {experienceCardProps.experience.title}
          </h2>
          <p className="h-16 overflow-hidden text-sm">
            {experienceCardProps.experience.description}
          </p>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex justify-between px-3 pb-3 items-center">

          {/* PRICE TAG */}
          <h2 className="text-xl font-bold">${experienceCardProps.experience.price}</h2>

          {/* ACTION BUTTON LIST */}
          <div className="">
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

          {/* MODAL BUTTON */}
          <div className="">
            <button
              className="rounded-lg bg-amber-400 p-2 text-white drop-shadow-md"
              onClick={() => showModal()}
            >
              {experienceCardProps.modalButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}

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
