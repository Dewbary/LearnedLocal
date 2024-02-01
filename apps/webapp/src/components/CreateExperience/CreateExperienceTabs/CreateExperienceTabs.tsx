import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateExperienceTabs.module.css";
import type { FormPage } from "~/components/types";

type Props = {
  tabInfoList: FormPage[];
  onTabClick: (index: number) => void;
};

const CreateExperienceTabs = ({ tabInfoList, onTabClick }: Props) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedTab(router.asPath);
  }, [router.asPath]);

  return (
    <ul
      className={`mb-8 flex flex-1 items-center justify-center space-x-2 md:flex-col md:justify-start md:space-x-0`}
    >
      {tabInfoList.map((item, index) => {
        const isSelected = selectedTab.includes(item.url);

        return (
          <div key={index}>
            <li className="hidden md:block">
              <div className="flex flex-col items-center">
                <button
                  className={`h-10 w-48 rounded-lg text-center ${
                    isSelected
                      ? "bg-ll-black text-white"
                      : "border border-ll-slate"
                  }`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onTabClick(index);
                  }}
                >
                  {item.tabTitle}
                </button>
                {index < tabInfoList.length - 1 && (
                  <div className={styles.progressLine}></div>
                )}
              </div>
            </li>
            <li className="block md:hidden">
              <button
                className={`h-3 w-12 rounded-lg text-center ${
                  isSelected
                    ? "bg-ll-orange text-white"
                    : "border border-ll-orange"
                }`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onTabClick(index);
                }}
              />
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default CreateExperienceTabs;
