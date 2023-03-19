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
