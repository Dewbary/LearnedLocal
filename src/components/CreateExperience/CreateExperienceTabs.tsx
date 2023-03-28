// components/layout/Sidebar.tsx
import React from "react";
import Link from "next/link";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { TabInfo } from "./types";

type Props = {
  tabInfoList: TabInfo[];
};

const CreateExperienceTabs = ({ tabInfoList }: Props) => {
  return (
    <Sidebar className="flex h-[calc(100vh_-_2rem)] w-20 flex-col items-center justify-between py-6">
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
