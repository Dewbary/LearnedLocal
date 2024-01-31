import { useFormikContext } from "formik";
import type { SignupFlowFormValues } from "./SignUpFlow";
import { useState } from "react";
import { Typography } from "~/components/common/Typography";

export default function IntentSurveyTab() {

  const { values } = useFormikContext<SignupFlowFormValues>();
  const [ checkedBox, setCheckedBox ] = useState(values.host);
  
  const handleCheckboxDivClick = (checkboxValue: string) => {
    values.host = checkboxValue;
    setCheckedBox(checkboxValue);
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-5"> 
        <h1 className="text-center mb-5 w-72 lg:w-full lg:mb-8">
          <span className={Typography.PrimaryTitle}>
            What brings you to LearnedLocal?
          </span>
        </h1>
        <div className="w-full flex flex-row items-center gap-3 border border-gray-400 p-5 rounded-lg hover:cursor-pointer hover:opacity-70" onClick={() => handleCheckboxDivClick("guest")}>
          <input type="checkbox" checked={checkedBox === "guest"} readOnly className="w-7 h-7 bg-ll-grey checkbox"/>
          <div className={Typography.BodyText}>I want to find and attend unique experiences</div>
        </div>
        <div className="w-full flex flex-row items-center gap-3 border border-gray-400 p-5 rounded-lg hover:cursor-pointer hover:opacity-70" onClick={() => handleCheckboxDivClick("host")}>
          <input type="checkbox" checked={checkedBox === "host"} readOnly className="w-7 h-7 bg-ll-grey checkbox"/>
          <div className={Typography.BodyText}>I want to make money hosting experiences</div>
        </div>
        <div className="w-full flex flex-row items-center gap-3 border border-gray-400 p-5 rounded-lg hover:cursor-pointer hover:opacity-70" onClick={() => handleCheckboxDivClick("both")}>
          <input type="checkbox" checked={checkedBox === "both"} readOnly className="w-7 h-7 bg-ll-grey checkbox"/>
          <div className={Typography.BodyText}>Both</div>
        </div>
      </div>
    </>
  )
}