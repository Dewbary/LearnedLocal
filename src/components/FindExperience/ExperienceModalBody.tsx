import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Experience } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type ModalActionButton = {
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
};

type Props = {
  experience: Experience;
  modalActionButton?: ModalActionButton;
};

export default function ExperienceModalBody({
  experience,
  modalActionButton,
}: Props) {
  const dateDisplayOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  } as const;

  const [activeImage, setActiveImage] = useState(experience.photos[0] || "");

  const handleClickImage = function (image: string) {
    setActiveImage(image);
  };

  const getRegistrantCount =
    api.registration.registrantCountByExperience.useQuery(experience.id);

  const router = useRouter();

  const goToCheckoutPage = async function (experienceId: number) {
    await router.push(`/experience/checkout?experienceId=${experienceId}`);
  };

  return (
    <>
      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex flex-grow overflow-y-scroll">
        <div className="basis-full">
          {/* IMAGES PORTION */}
          <div className="m-10 grid grid-cols-4 gap-4">
            <div className="col-span-4 max-h-60 overflow-hidden lg:col-span-2 lg:row-span-2">
              <img src={activeImage} alt="experience photo" />
            </div>
            {[0, 1, 2, 3].map((e, i) => {
              return (
                <>
                  <div key={i} className="max-h-28 overflow-hidden">
                    {experience.photos[i] && (
                      <img
                        src={experience.photos[i]}
                        alt="experience photo"
                        className=""
                        onClick={() =>
                          handleClickImage(experience.photos[i] || "")
                        }
                      />
                    )}
                    {!experience.photos[i] && (
                      <div className="h-28 w-full bg-slate-100" />
                    )}
                  </div>
                </>
              );
            })}
          </div>

          {/* DESCRIPTION PORTION */}
          <div className="mx-10 flex flex-col lg:flex-row">
            <div className="lg:order-0 order-2 mr-3 basis-2/3">
              <h3 className="text-xl font-bold">Description</h3>
              <p>{experience.description}</p>
              <br />
              <h3 className="text-xl font-bold">Details</h3>
              <ul>
                <li>{experience.guestRequirements}</li>
                <li>{experience.provided}</li>
                <li>{experience.activityLevel}</li>
                <li>{experience.skillLevel}</li>
              </ul>
              <br />
              <h3 className="text-xl font-bold">Itinerary</h3>
              <p>{experience.timeline}</p>
              <br />
              <h3 className="text-xl font-bold">Location Notes</h3>
              <p>{experience.locationDescription}</p>
              <br />
              <br />
            </div>
            <div className="mb-5 grid h-full basis-1/3 grid-cols-5 items-center gap-y-3 border-b-2 pb-5 lg:order-2 lg:border-b-0 lg:border-l-2 lg:pl-5">
              <ClockIcon className="w-5" />{" "}
              <span className="col-span-4">
                {experience.startTime} - {experience.endTime}
              </span>
              <MapPinIcon className="w-5" />{" "}
              <span className="col-span-4">
                {experience.location?.toString()}
              </span>
              <CalendarIcon className="w-5" />{" "}
              <span className="col-span-4">
                {experience.date.toLocaleDateString(
                  "en-US",
                  dateDisplayOptions
                )}
              </span>
              <UserIcon className="w-5" />{" "}
              <span className="col-span-4">Ages {experience.minAge}+</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between border-t py-4 pl-10 pr-6">
        <div className="text-3xl font-bold">${experience.price}</div>
        <div className="">
          <UserIcon className="mr-2 inline w-5 rounded-full border border-black" />
          <span>
            {getRegistrantCount.data}/{experience.maxAttendees} Spots Filled
          </span>
        </div>
        {modalActionButton ? (
          <>
            <button
              className={`${modalActionButton.buttonColor} rounded-lg p-3 text-white`}
              onClick={() => modalActionButton?.buttonAction()}
            >
              {modalActionButton.buttonText}
            </button>
          </>
        ) : (
          <button 
            disabled={(getRegistrantCount.data || 0) >= experience.maxAttendees} 
            className={"rounded-lg bg-amber-400 p-3 text-white disabled:cursor-not-allowed disabled:bg-gray-500"}
            onClick={() => goToCheckoutPage(experience.id)}>
              Sign Up
          </button>
        )}
      </div>
    </>
  );
}
