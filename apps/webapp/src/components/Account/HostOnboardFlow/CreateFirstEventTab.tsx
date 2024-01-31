import { useFormikContext } from "formik";
import type { HostOnboardFormValues } from "./HostOnboardFlow";
import { useState } from "react";
import { Typography } from "~/components/common/Typography";

export default function CreateFirstEventTab() {

  const { values } = useFormikContext<HostOnboardFormValues>();
  const [ checkedBox, setCheckedBox ] = useState(values.createNow);
  
  const handleCheckboxDivClick = (checkboxValue: string) => {
    values.createNow = checkboxValue;
    setCheckedBox(checkboxValue);
  }

  return (
    <>
      <h1 className="mb-5 w-72 ml-5 lg:ml-0 lg:w-full lg:mb-8">
        <span className={Typography.PrimaryTitle}>Create your first event</span>
      </h1>
      <div className="w-full flex flex-col gap-4">
        <p className={Typography.BodyText}>Congratulations on completing your hosting profile! Would you like to create your first experience?</p>
        <div className="w-full flex flex-row items-center gap-3 border border-gray-400 p-5 rounded-lg hover:cursor-pointer hover:opacity-70" onClick={() => handleCheckboxDivClick("now")}>
          <input type="checkbox" checked={checkedBox === "now"} readOnly className="w-7 h-7 bg-ll-grey checkbox" data-cy="createExpNowCheckbox"/>
          <div className={Typography.BodyText}>Create an experience now</div>
        </div>
        <div className="w-full flex flex-row items-center gap-3 border border-gray-400 p-5 rounded-lg hover:cursor-pointer hover:opacity-70" onClick={() => handleCheckboxDivClick("later")}>
          <input type="checkbox" checked={checkedBox === "later"} readOnly className="w-7 h-7 bg-ll-grey checkbox"/>
          <div className={Typography.BodyText}>I&apos;ll create one later</div>
        </div>
      </div>
      
    </>
  )
}