import Link from "next/link";
import * as React from "react";
import { Typography } from "../Typography";

type Props = {
  text: string;
  route: string;
  dataCy?: string | null | undefined;
};

const NavigationLink = ({ text, route, dataCy }: Props) => {
  return (
    <Link
      href={route}
      className="flex items-center justify-center px-4 hover:cursor-pointer hover:border-b-ll-blue hover:border-b-4"
      data-cy={dataCy}
    >
      <span className={Typography.BodyText}>{text}</span>
    </Link>
  );
};

export default NavigationLink;
