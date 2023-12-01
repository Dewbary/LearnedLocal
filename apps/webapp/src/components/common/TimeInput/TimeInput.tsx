import * as React from "react";
import { Typography } from "../Typography";
import cx from "classnames";

type Props = {};

const TimeInput = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <div className={cx(Typography.BigLabelText, "mb-2")}>Start time</div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col">
            <div className="h-20 w-20 rounded-lg border-2 border-ll-slate bg-black"></div>
          </div>
          <div className="mx-4 self-center text-[24px] text-xl font-[700]">
            :
          </div>
          <div className="flex flex-col">
            <div className="h-20 w-20 rounded-lg border-2 border-ll-slate bg-white"></div>
          </div>
          <div className="ml-4 h-20 w-14 ">
            <div className="flex h-1/2 items-center justify-center rounded-t-lg border-2 border-ll-slate bg-black text-white">
              AM
            </div>
            <div className="flex h-1/2 items-center justify-center rounded-b-lg border-2 border-t-0 border-ll-slate bg-white">
              PM
            </div>
          </div>
        </div>
        <div className={cx(Typography.BodyText, "mt-2 flex text-ll-slate")}>
          <div className="mr-10 w-20">Hour</div>
          <div className="w-20">Minute</div>
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
