// components/layout/Sidebar.tsx
import React, { useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";

import { BsChevronDown } from "react-icons/bs";
// define a NavItem prop
export type NavItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: boolean;
  submenuItems?: SubmenuItem[];
};

export type SubmenuItem = {
  label: string;
  href: string;
};

// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true, // layout
        "bg-gray": true, // colors
        "fixed top-0 z-20 md:sticky md:top-16 md:z-0 md:w-full": true, // positioning
        "h-full w-[300px] md:h-[calc(100vh_-_64px)]": true, // for height and width
        ".3s transition-transform ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className="top-0 md:sticky md:top-16">
        {/* nav items */}
        <ul className="flex flex-col gap-2 py-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href || ""}>
                <li
                  className={classNames({
                    "hover:bg-primary": true, //colors
                    "flex items-center gap-4 ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "mx-2 rounded-md p-2": true, //self style
                  })}
                >
                  {item.icon} {item.label}
                  {item.submenu && (
                    <BsChevronDown
                      className={`${subMenuOpen && "rotate-180"}`}
                      onClick={() => setSubMenuOpen(!subMenuOpen)}
                    />
                  )}
                </li>
                {item.submenu && subMenuOpen && (
                  <ul>
                    {item.submenuItems?.map((submenuItem, index) => (
                      <li
                        className={classNames({
                          "hover:bg-primary": true, //colors
                          "flex items-center gap-4 ": true, //layout
                          "transition-colors duration-300": true, //animation
                          "mx-2 rounded-md py-2 px-10": true, //self style
                        })}
                        key={index}
                      >
                        {submenuItem.label}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
