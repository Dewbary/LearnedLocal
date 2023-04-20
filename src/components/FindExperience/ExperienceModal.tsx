import Image from "next/image";
import outdoors2 from "../../assets/outdoors-2.png";
import profile_pic from "../../assets/profile_pic.png";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import type { Experience } from "@prisma/client";
import { Pin } from "../CreateExperience/LocationPicker/LocationPicker";
import { generateGoogleMapsURL } from "./FindExperienceUtils";

type Props = {
  experience: Experience;
  hideModal: () => void;
};

const ExperienceModal = ({ experience, hideModal }: Props) => {
  const dateDisplayOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  } as const;

  const location: Pin = experience.location as Pin;
  const { lat, lng } = location;

  return (
    <div className="relative flex h-5/6 w-2/3 flex-col rounded-3xl bg-white">
      {/* TOP BAR */}
      <div className=" flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg">
        <div>
          <h1 className="text-4xl font-bold">{experience.title}</h1>
          <p>
            <span className="align-middle">Hosted By</span>
            <span className="inline-block">
              <Image
                src={profile_pic}
                alt="profile pic"
                className="mx-2 inline w-5"
              />
              <span className="align-middle text-yellow-600">
                {experience.firstName} {experience.lastName}
              </span>
            </span>
          </p>
        </div>
        <div className="flex">
          <h1 className="mr-3 text-2xl">
            {experience.date.toLocaleDateString("en-US", dateDisplayOptions)}
          </h1>
          <button
            type="button"
            onClick={hideModal}
            className="ml-auto inline-flex h-9 items-center place-self-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex flex-grow overflow-y-scroll">
        <div className="basis-full">
          {/* IMAGES PORTION */}
          <div className="m-10 flex h-56">
            <div className="mr-3 h-full w-1/2 overflow-hidden rounded-l-3xl">
              <img src={experience.photos[0]} alt="outdoors" className="" />
            </div>
            <div className="grid h-full w-1/2 grid-cols-2 gap-4">
              <div className="overflow-hidden">
                <img src={experience.photos[1]} alt="outdoors" />
              </div>
              <div className="overflow-hidden rounded-tr-3xl">
                <Image src={outdoors2} alt="outdoors" />
              </div>
              <div className="overflow-hidden">
                <Image src={outdoors2} alt="outdoors" />
              </div>
              <div className="overflow-hidden rounded-br-3xl">
                <Image src={outdoors2} alt="outdoors" />
              </div>
            </div>
          </div>

          {/* DESCRIPTION PORTION */}
          <div className="mx-10 flex">
            <div className="mr-3 basis-2/3">
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
            <div className="grid h-full basis-1/3 grid-cols-5 items-center gap-y-3 border-l-2 pl-5">
              <ClockIcon className="w-5" />{" "}
              <span className="col-span-4">
                {experience.startTime} - {experience.endTime}
              </span>
              <MapPinIcon className="w-5" />{" "}
              <span className="col-span-4">
                <a
                  href={generateGoogleMapsURL(lat, lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Experience Location
                </a>
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
          <span>9/{experience.maxAttendees} Spots Filled</span>
        </div>
        <button className="rounded-lg bg-amber-400 p-3 text-white">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default ExperienceModal;
