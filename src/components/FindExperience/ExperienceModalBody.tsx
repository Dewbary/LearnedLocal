import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Experience, Profile } from "@prisma/client";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { generateGoogleMapsURL } from "./FindExperienceUtils";
import { Pin } from "../CreateExperience/LocationPicker/LocationPicker";
import ExperienceImageDisplay from "../ExperienceImageDisplay";
import { ExperienceInfo } from "../types";

type ModalActionButton = {
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
};

type Props = {
  experience: ExperienceInfo;
  registered: boolean;
  modalActionButton?: ModalActionButton;
  hostProfile?: Profile | null;
};

export default function ExperienceModalBody({
  experience,
  registered,
  modalActionButton,
  hostProfile,
}: Props) {
  const dateDisplayOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  } as const;

  const router = useRouter();
  const registrantCount = api.registration.registrantCountByExperience.useQuery(
    experience.id
  );

  const goToViewPage = async function (experienceId: number) {
    await router.push(`/experience/view/${experienceId}`);
  };

  const location: Pin = experience.location as Pin;
  const { lat, lng } = location;

  const availableDates = experience.availability?.map((a) => a.date);

  return (
    <>
      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex flex-grow overflow-y-scroll">
        <div className="basis-full">
          {/* IMAGES PORTION */}
          <ExperienceImageDisplay photos={experience.photos} />

          {/* DESCRIPTION PORTION */}
          <div className="mx-10 flex flex-col lg:flex-row">
            {registered && (
              <div className="lg:order-0 order-2 mr-3 mb-3 basis-2/3">
                <h3 className="text-xl font-bold">Contact Host</h3>
                <p>Email: {hostProfile?.email}</p>
                {hostProfile?.phone && <p>Phone: {hostProfile?.phone}</p>}
              </div>
            )}
            <div className="lg:order-0 order-2 mr-3 basis-2/3">
              <h3 className="text-xl font-bold">Description</h3>
              <p>{experience.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between border-t py-4 pl-6 pr-6">
        <div className="text-3xl font-bold">${experience.price}</div>
        <div className="">
          {/* <UserIcon className="mr-2 inline w-4 rounded-full border border-black lg:w-5" /> */}
          <span className="lg:text-md text-sm">
            {/* {registrantCount.data}/{experience.maxAttendees} Spots Filled */}
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
            disabled={(registrantCount.data || 0) >= experience.maxAttendees}
            className={
              "rounded-lg bg-amber-400 p-3 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
            }
            onClick={() => goToViewPage(experience.id)}
          >
            View Details
          </button>
        )}
      </div>
    </>
  );
}
