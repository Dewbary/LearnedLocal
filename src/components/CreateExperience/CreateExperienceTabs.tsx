// components/layout/Sidebar.tsx
import React, { useMemo, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "../layout/defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";

import { BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import TimePage from "./TimePage";
import LocationPage from "./LocationPage";
import DescriptionPage from "./DescriptionPage";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { TabInfo } from "./types";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  activeMatcher: string;
  icon: React.ReactNode;
  submenu?: boolean;
  submenuItems?: SubmenuItem[];
};

export type SubmenuItem = {
  label: string;
  href: string;
  activeMatcher: string;
};

// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
  tabInfoList: TabInfo[];
};
const CreateExperienceTabs = ({
  open,
  navItems = defaultNavItems,
  setOpen,
  tabInfoList,
}: Props) => {
  return (
    <Sidebar>
      <Menu>
        {tabInfoList.map((item, index) => {
          return (
            <MenuItem
              key={index}
              component={<Link href={item.url} shallow={true} />}
            >
              {item.text}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
export default CreateExperienceTabs;
