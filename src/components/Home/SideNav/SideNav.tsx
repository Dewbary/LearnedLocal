import * as React from "react";

import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  CameraIcon,
  CheckCircleIcon,
  UserIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
  ChevronRightIcon,
  HeartIcon,
  PaintBrushIcon,
  CakeIcon,
  PhotoIcon,
  BackwardIcon,
  CalendarDaysIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { ExperienceInfo } from "../../types";
import { getExperiences } from "../../ViewExperience/ViewExperienceUtils";
import FilteredExperiencesContext from "../FilteredExperiencesContext";

type Props = {
  experiences: ExperienceInfo[];
  onSetExperiences: (experiences: ExperienceInfo[]) => void;
};

const SideNav = ({ experiences, onSetExperiences }: Props) => {
  const { filteredExperiences, setFilteredExperiences } = React.useContext(
    FilteredExperiencesContext
  );

  const [open, setOpen] = React.useState(true);
  const Menus = [
    { title: "Current", icon: <CalendarDaysIcon className="h-6 w-6" /> },
    { title: "Upcoming", icon: <CalendarIcon className="h-6 w-6" /> },
    { title: "Past", icon: <BackwardIcon className="h-6 w-6" /> },
    {
      title: "Outdoors",
      icon: <PhotoIcon className="h-6 w-6" />,
      gap: true,
    },
    { title: "Culinary", icon: <CakeIcon className="h-6 w-6" /> },
    { title: "Art", icon: <PaintBrushIcon className="h-6 w-6" /> },
    { title: "Health & Wellness", icon: <HeartIcon className="h-6 w-6" /> },
    { title: "All", icon: <RectangleStackIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="relative md:border-r-2 md:border-r-slate-100">
      <ChevronRightIcon
        className={`absolute top-4 -right-3 z-10 hidden h-8 w-8 cursor-pointer rounded-full bg-slate-100 p-2 md:block ${
          !open ? "rotate-180" : ""
        }`}
        onClick={() => setOpen(!open)}
      />
      <div
        className={` ${
          open ? "w-screen md:w-72" : "w-screen md:w-20 "
        } relative overflow-y-hidden overflow-x-scroll duration-300 md:overflow-x-hidden md:px-5`}
      >
        <ul className="flex md:flex-col">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`hover:bg-light-white flex cursor-pointer items-center gap-x-4 rounded-md px-6 text-sm text-gray-500 md:px-2 md:py-6 
              ${Menu.gap ? "mt-4 md:mt-9" : "mt-4 md:mt-2"} ${
                index === 0 ? "bg-light-white" : ""
              }`}
              onClick={() => {
                setFilteredExperiences(getExperiences(Menu.title, experiences));
              }}
            >
              {Menu.icon}
              <span
                className={`${
                  !open ? "md:hidden" : ""
                } origin-left duration-200`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
