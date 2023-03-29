// CreateExperienceTabs.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabInfo } from "../types";
import styles from "./CreateExperienceTabs.module.css";

type Props = {
  tabInfoList: TabInfo[];
  currentTab: string;
};

const CreateExperienceTabs = ({ tabInfoList, currentTab }: Props) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedTab(router.asPath);
  }, [router.asPath]);

  return (
    <ul className={`flex flex-col items-end`}>
      {tabInfoList.map((item, index, array) => {
        const isSelected =
          (item.activeMatcher === "experience/create" && currentTab === "") ||
          selectedTab.endsWith(item.activeMatcher);

        return (
          <li key={index} className={styles.progressItem}>
            {index < array.length - 1 && (
              <div
                className={`${styles.progressLine} ${
                  isSelected ? styles.progressLineSelected : ""
                }`}
              />
            )}
            <Link href={item.url} shallow={true}>
              <div
                className={`flex w-full items-center rounded-lg p-2 ${
                  isSelected ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                <div className="flex content-end items-center space-x-2">
                  <span>{item.text}</span>
                  {item.icon}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CreateExperienceTabs;
