import Image from "next/image";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience, Profile } from "@prisma/client";
import profile_pic from "../../assets/profile_pic.png";
import GenericModal from "../GenericModal";

type ActionButton = {
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
};

type Props = {
  experience: Experience;
  actionButtonList?: ActionButton[];
  modalButtonText: string;
  modalHeaderContent: JSX.Element;
  modalBodyContent: JSX.Element;
  showPrice?: boolean;
  hostProfile?: Profile | null;
  showDetails: boolean;
};

export default function ExperienceCard({
  experience,
  actionButtonList,
  modalButtonText,
  modalHeaderContent,
  modalBodyContent,
  showPrice,
  hostProfile,
  showDetails,
}: Props) {
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
      <div className="relative flex h-96 w-72 flex-col overflow-hidden rounded-2xl">
        <Image
          src={experience.photos[0] || ""}
          alt="experience image"
          className="object-cover"
          fill
        />

        {/* Card content */}
        <div className="absolute inset-0 flex flex-col justify-between ">
          {/* TITLE BAR */}
          <div className="flex items-center justify-between"></div>

          {/* BOTTOM BAR */}
          <div className="flex h-40 flex-col justify-between bg-opacity-0 bg-gradient-to-t from-black p-4 text-white">
            <div className="flex h-24 flex-1 flex-col justify-end">
              {/* DESCRIPTION BOX */}
              <div className="flex items-center justify-between">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  {hostProfile?.profileImage ? (
                    <Image
                      src={hostProfile.profileImage}
                      alt="Profile Picture"
                      className="rounded-full object-cover"
                      layout="fill"
                    />
                  ) : (
                    <Image
                      src={profile_pic}
                      alt="Profile Picture Anonymous"
                      className="rounded-full object-cover"
                      layout="fill"
                    />
                  )}
                </div>
                {showDetails && (
                  <h2 className="text-2xl font-bold uppercase">
                    {experience.date.toLocaleDateString(
                      "en-US",
                      dateDisplayOptions
                    )}
                  </h2>
                )}
              </div>
              <div className=" ">
                <h2 className="text-xl font-bold">{experience.title}</h2>
                {/* <p className="h-10 overflow-hidden text-sm">
                {experience.description}
              </p> */}
              </div>

              <div className="flex flex-row justify-between">
                {/* PRICE TAG */}
                {(showPrice === true ||
                  (showPrice === undefined && showDetails)) && (
                  <h2 className="text-lg font-bold">${experience.price}</h2>
                )}

                {/* ACTION BUTTON LIST */}
                <div className="flex gap-2">
                  {actionButtonList?.map((actionButton, i) => {
                    return (
                      <button
                        className={`rounded py-1 px-2 text-white ${actionButton.buttonColor} shadow-md`}
                        onClick={() => actionButton.buttonAction()}
                        key={i}
                      >
                        {actionButton.buttonText}
                      </button>
                    );
                  })}
                </div>

                {/* MODAL BUTTON */}
                {showDetails && (
                  <button
                    className="rounded bg-yellow-300 py-1 px-2 text-white shadow-md"
                    onClick={() => showModal()}
                  >
                    {modalButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <div
        className={`fixed inset-0 z-40 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50 ${
          (modalHidden ? styles["modal-hidden"] : styles["modal-visible"]) ?? ""
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <GenericModal
            hideModal={hideModal}
            modalContent={modalBodyContent}
            modalHeaderContent={modalHeaderContent}
          />
        </div>
      </div>
    </>
  );
}
