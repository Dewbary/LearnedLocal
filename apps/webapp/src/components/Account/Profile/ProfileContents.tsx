import { type ReactNode, useState } from "react";
import GeneralTab from "./Tabs/GeneralTab";
import PasswordTab from "./Tabs/PasswordTab";
import HostInfoTab from "./Tabs/HostInfoTab";
import { Typography } from "~/components/common/Typography";

export default function NewProfileContents() {

  const [ selectedTab, setSelectedTab ] = useState(0);

  const profileTabs = [
    <GeneralTab key={0} />,
    <PasswordTab key={1} />,
    <HostInfoTab key={2} />
  ] as ReactNode[];

  const profileTabTitles = [
    "General",
    "Password",
    "Hosting"
  ]

  const handleProfileTabSelect = (tab: number) => {
    setSelectedTab(tab);
  }

  return (
    <>
      <div className="w-full flex flex-col p-5 max-w-6xl flex-grow pb-20 items-center">
        <div className="flex flex-col lg:flex-row gap-7 w-full max-w-xs lg:max-w-none">

          <div className="flex flex-col gap-4 lg:gap-8 lg:border-r lg:border-r-gray-400 lg:pr-16 lg:mr-10">
            <h1 className={Typography.PrimaryTitle}>My Account</h1>
            <div className="flex flex-rol lg:flex-col gap-1 lg:gap-3 lg:items-end">
              {profileTabTitles.map((tabTitle, index) => (
                <div 
                  className={`w-22 text-center rounded-md py-1 lg:w-5/6 lg:text-right lg:pr-3 lg:py-2 lg:hover:outline lg:hover:cursor-pointer lg:hover:outline-1 ${selectedTab === index ? "bg-ll-black text-ll-grey" : "text-gray-400"}`}
                  onClick={() => handleProfileTabSelect(index)}
                  key={index}
                >
                  <span className={Typography.BodyText}>
                    {tabTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md">
            {profileTabs[selectedTab]}
          </div>

        </div>
      </div>
    </>
  )
}