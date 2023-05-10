import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabInfo } from "../types";
import styles from "./CreateExperienceTabs.module.css";

type Props = {
  tabInfoList: TabInfo[];
  currentTab: string | undefined;
  onTabClick: (index: number) => void;
};

const CreateExperienceTabs = ({
  tabInfoList,
  currentTab,
  onTabClick,
}: Props) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedTab(router.asPath);
  }, [router.asPath]);

  return (
    <div className="hidden md:block">
      <aside className="flex w-64 flex-col overflow-y-auto">
        <div className={`flex flex-grow flex-col items-end md:block`}>
          <ul className={`flex flex-col items-end`}>
            {tabInfoList.map((item, index, array) => {
              const isSelected = selectedTab.includes(item.activeMatcher);

              return (
                <li key={index} className={styles.progressItem}>
                  {index < array.length - 1 && (
                    <div
                      className={`${styles.progressLine ?? ""} ${
                        isSelected ? styles.progressLineSelected ?? "" : ""
                      }`}
                    />
                  )}
                  <Link href={item.url} shallow={true}>
                    <div
                      className={`flex w-full items-center rounded-lg p-2 ${
                        isSelected ? "bg-amber-500 text-white" : "bg-white"
                      }`}
                      onClick={() => onTabClick(index)}
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
          <div className="flex flex-1 flex-col items-end justify-end pb-20 ">
            <button className="btn text-white">
              <Link href="/">Return Home</Link>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CreateExperienceTabs;
