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
    <ul className={`flex flex-1 flex-col items-center`}>
      {tabInfoList.map((item, index) => {
        const isSelected = selectedTab.includes(item.url);

        return (
          <li key={index}>
            <div className="flex flex-col items-center">
              <button
                className={`h-10 w-48 rounded-lg text-center ${
                  isSelected
                    ? "bg-ll-black text-white"
                    : "border border-ll-slate"
                }`}
                onClick={() => onTabClick(index)}
              >
                {item.tabTitle}
              </button>
              {index < tabInfoList.length - 1 && (
                <div className={styles.progressLine}></div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CreateExperienceTabs;
