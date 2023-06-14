import Image from "next/image";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience, Profile, Registration } from "@prisma/client";
import profile_pic from "../../assets/profile_pic.png";
import GenericModal from "../GenericModal";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";

type ActionButton = {
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
};

type Props = {
  experience: Experience & {
    profile: Profile | null;
  };
  actionButtonList?: ActionButton[];
  modalButtonText: string;
  modalHeaderContent: JSX.Element;
  modalBodyContent: JSX.Element;
  showLocation?: boolean;
  showDate?: boolean;
  hostProfile?: Profile | null;
  enableModal: boolean;
  enableFullBanner: boolean;
};

export default function ExperienceCard({
  experience,
  actionButtonList,
  modalButtonText,
  modalHeaderContent,
  modalBodyContent,
  showLocation,
  showDate,
  hostProfile,
  enableModal,
  enableFullBanner,
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

  const registrantCount = api.registration.registrantCountByExperience.useQuery(experience.id);

  return (
    <>
      <div
        className={`${
          styles["card-height"] ?? ""
        }  flex w-72 flex-col rounded-2xl bg-white drop-shadow-xl`}
      >
        {/* TITLE BAR */}
        <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-br from-amber-300 to-amber-400 p-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            {hostProfile?.profileImage ? (
              <Image
                src={hostProfile.profileImage}
                alt="Profile Picture"
                className="rounded-full object-cover"
                fill
              />
            ) : (
              <Image
                src={profile_pic}
                alt="Profile Picture Anonymous"
                className="rounded-full object-cover"
                fill
              />
            )}
          </div>
          {showDate && (
            <h2 className="text-4xl font-bold">
              {experience.date
                .toLocaleDateString("en-US", dateDisplayOptions)
                .toLocaleUpperCase()}
            </h2>
          )}
        </div>

        {/* COVER IMAGE */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={experience.photos[0] || ""}
            alt="experience image"
            className="absolute object-cover"
            fill
          />
          {/* {(enableFullBanner && (registrantCount.data || 0) >= experience.maxAttendees) &&
            <div className="absolute bg-black bg-opacity-70 h-full w-full flex items-center justify-center">
              <div className="bg-red-400 w-full flex justify-center py-5">
                <h3 className="text-white font-bold text-3xl">FULL</h3>
              </div>
            </div>
          } */}
        </div>

        {/* DESCRIPTION BOX */}
        <div className="px-3">
          <h2 className="text-2xl font-bold">{experience.title}</h2>
          <p className="h-10 overflow-hidden text-sm">
            {experience.description}
          </p>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex items-center justify-between px-3 pb-3">

          {/* LOCATION TEXT */}
          {showLocation == true &&
            <div className="flex flex-row gap-1">
              <MapPinIcon className="w-5" />
              <h2 className="text-lg">{experience.city}</h2>
            </div>
          }
          
          {/* PRICE TAG
          {showPrice === true ||
            (showPrice === undefined && showDetails && (
              <h2 className="text-xl font-bold">${experience.price}</h2>
            ))} */}

          {/* ACTION BUTTON LIST */}
          <div className="flex flex-row gap-2">
            {actionButtonList?.map((actionButton, i) => {
              return (
                <button
                  className={`rounded-lg ${actionButton.buttonColor} p-2 text-white drop-shadow-md`}
                  onClick={() => actionButton.buttonAction()}
                  key={i}
                >
                  {actionButton.buttonText}
                </button>
              );
            })}
          </div>

          {/* MODAL BUTTON */}
          {enableModal && (
            <div className="">
              <button
                className="rounded-lg bg-amber-400 p-2 text-white drop-shadow-md"
                onClick={() => showModal()}
              >
                {modalButtonText}
              </button>
            </div>
          )}
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
