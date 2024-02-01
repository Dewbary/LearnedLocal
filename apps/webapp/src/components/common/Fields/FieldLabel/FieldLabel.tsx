import * as React from "react";
import orangeAsterisk from "../../../../../assets/orange_asterisk.png";
import Image from "next/image";
import { Typography } from "../../Typography";

type Props = {
  displayName: string;
  required?: boolean;
};
const FieldLabel = ({ displayName, required }: Props) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <h2 className={Typography.InputLabel}>{displayName}</h2>
      {required && (
        <Image
          src={orangeAsterisk}
          alt="a required field"
          width={12}
          height={12}
          className="pb-1"
        />
      )}
    </div>
  );
};

export default FieldLabel;
