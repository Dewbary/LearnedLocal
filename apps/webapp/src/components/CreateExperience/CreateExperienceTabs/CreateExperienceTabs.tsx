import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabInfo } from "../types";
import styles from "./CreateExperienceTabs.module.css";

type Props = {
  tabInfoList: TabInfo[];
  onTabClick: (index: number) => void;
};

const CreateExperienceTabs = ({ tabInfoList, onTabClick }: Props) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedTab(router.asPath);
  }, [router.asPath]);

  return (
    <div className="hidden lg:block">
      <aside className="flex w-48 flex-col overflow-y-auto">
        <div className={`flex flex-grow flex-col items-end md:block`}>
          <ul className={`flex flex-col items-end`}>
            {tabInfoList.map((item, index, array) => {
              const isSelected = selectedTab.includes(item.activeMatcher);

              return (
                <li key={index} className={styles.progressItem}>
                  <button
                    className={`flex w-full items-center rounded-lg p-2 ${
                      isSelected ? "bg-amber-500 text-white" : "bg-white"
                    }`}
                    onClick={() => onTabClick(index)}
                  >
                    <div className="flex content-end items-center space-x-2">
                      <span>{item.text}</span>
                      {item.icon}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-1 flex-col items-end justify-end pb-20 ">
            <button className="btn text-white">
              <Link href="/home">Return Home</Link>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CreateExperienceTabs;
