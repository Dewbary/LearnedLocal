// components/layout/defaultNavItems.tsx
import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Your Experience",
    href: "/",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    label: "Expectations",
    href: "/team",
    icon: <UserGroupIcon className="h-6 w-6" />,
  },
  {
    label: "Experience Page",
    icon: <FolderIcon className="h-6 w-6" />,
    submenu: true,
    submenuItems: [
      {
        label: "Describe Your Experience",
        href: "/test",
      },
      {
        label: "Location & Time",
        href: "/location",
      },
      {
        label: "About You",
        href: "/about",
      },
    ],
  },
  {
    label: "Settings",
    href: "/calendar",
    icon: <CalendarIcon className="h-6 w-6" />,
  },
  {
    label: "Final Steps",
    href: "/calendar",
    icon: <CalendarIcon className="h-6 w-6" />,
  },
];
