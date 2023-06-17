import Image from "next/image";
import { useState } from "react";
import styles from "./ExperienceCard.module.css";
import { Experience, Profile, Registration } from "@prisma/client";
import profile_pic from "../../../assets/profile_pic.png";
import GenericModal from "../../GenericModal";
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

  const registrantCount = api.registration.registrantCountByExperience.useQuery(
    experience.id
  );

  return (
    <>
      <button
        className={`relative flex h-96 w-72 flex-col overflow-hidden rounded-2xl drop-shadow-xl`}
        onClick={() => showModal()}
      >
        <Image
          src={experience.photos[0] || ""}
          alt="experience image"
          className="absolute object-cover"
          fill
        />
        <div className="absolute inset-0 flex flex-col justify-between ">
          <div className="flex h-24 flex-1 flex-col justify-end">
            {/* BOTTOM BAR */}
            <div className="flex h-44 flex-col justify-between bg-opacity-0 bg-gradient-to-t from-black p-4 text-white">
              <div className="flex h-24 flex-1 flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center justify-between">
                    <h2 className="text-left text-xl font-bold">
                      {experience.title}
                    </h2>
                    <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full">
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
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {showLocation == true && (
                    <div className="flex flex-row items-center gap-1">
                      <MapPinIcon className="w-5" />
                      <h2 className="text-lg">{experience.city}</h2>
                    </div>
                  )}
                  <h2 className="font-bold uppercase">
                    {experience.date.toLocaleDateString(
                      "en-US",
                      dateDisplayOptions
                    )}
                  </h2>
                </div>

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
              </div>
            </div>
          </div>
        </div>
      </button>

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
