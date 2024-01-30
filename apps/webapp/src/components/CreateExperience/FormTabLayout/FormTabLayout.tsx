import React from "react";
import { useFormikContext } from "formik";
import useWarnIfUnsavedChanges from "../hooks/useWarnIfUnsavedChanges";
import { Typography } from "~/components/common/Typography";
import Button from "~/components/common/Button";
import SaveAndExitButton from "./SaveAndExitButton";
import FormPageHeader from "./FormPageHeader";
import FormPageContent from "./FormPageContent";

type Props = {
  title: string;
  subTitle: string;
  pageComponent: React.ReactNode;
  slug: string;
};

const FormTabLayout = ({ subTitle, pageComponent, slug }: Props) => {
  const { dirty } = useFormikContext();

  useWarnIfUnsavedChanges(dirty, slug);

  return (
    <>
      <FormPageContent>{pageComponent}</FormPageContent>
    </>
    // <div className="flex h-full w-full flex-col justify-between">
    //   <div className="flex flex-1 overflow-y-auto">{tabComponent}</div>
    //   <div
    //     className={`mt-6 flex ${
    //       isFirstStep ? "justify-end" : "justify-between"
    //     }`}
    //   >
    //     <button
    //       type="button"
    //       className={`rounded bg-amber-500 px-4 py-2 text-white ${
    //         isFirstStep ? "hidden" : ""
    //       }`}
    //       onClick={onBack}
    //     >
    //       Back
    //     </button>
    //     <button
    //       type="button"
    //       className={`rounded bg-amber-500 px-4 py-2 text-white ${
    //         isLastStep ? "hidden" : ""
    //       }`}
    //       onClick={onNext}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
};

export default FormTabLayout;
