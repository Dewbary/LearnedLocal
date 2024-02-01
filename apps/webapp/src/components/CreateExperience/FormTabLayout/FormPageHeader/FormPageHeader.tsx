import * as React from "react";
import { Typography } from "~/components/common/Typography";

type Props = {
  title: string;
  subTitle: string;
};

const FormPageHeader = ({ title, subTitle }: Props) => {
  return (
    <div className="m-4 flex flex-row justify-center text-center">
      <div className="flex flex-col">
        <div className={Typography.FormTitle}>{title}</div>
        <div className={`${Typography.SubText ?? ""} mb-4 h-12 max-w-md`}>
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export default FormPageHeader;
