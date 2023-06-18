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
} from "@heroicons/react/24/solid";

const SideNav = () => {
  const [open, setOpen] = React.useState(true);
  const Menus = [
    { title: "Current", icon: <HomeIcon className="h-6 w-6" /> },
    { title: "Upcoming", icon: <CalendarIcon className="h-6 w-6" /> },
    { title: "Past", icon: <CogIcon className="h-6 w-6" /> },
    {
      title: "Outdoors",
      icon: <CheckCircleIcon className="h-6 w-6" />,
      gap: true,
    },
    { title: "Culinary", icon: <MapPinIcon className="h-6 w-6" /> },
    { title: "Art", icon: <UserIcon className="h-6 w-6" /> },
    { title: "Sports", icon: <CameraIcon className="h-6 w-6" /> },
    { title: "All", icon: <CalendarIcon className="h-6 w-6" /> },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } relative  h-screen border-t-2 border-r-2 border-r-slate-100 border-t-slate-100 p-5 pt-8 duration-300`}
    >
      <ChevronRightIcon
        className={`absolute -right-3 top-9 h-8 w-8 cursor-pointer rounded-full bg-slate-100 p-2  ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      {/* <img
        src="./src/assets/control.png"
        className={`border-dark-purple absolute -right-3 top-9 w-7 cursor-pointer
           rounded-full border-2  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      /> */}
      {/* <div className="flex items-center gap-x-4">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`origin-left text-xl font-medium text-white duration-200 ${
            !open && "scale-0"
          }`}
        >
          Designer
        </h1>
      </div> */}
      <ul className="">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`hover:bg-light-white  flex cursor-pointer items-center gap-x-4 rounded-md px-2 py-6 text-sm text-gray-300 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            {Menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
