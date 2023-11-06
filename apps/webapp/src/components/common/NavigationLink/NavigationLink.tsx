import Link from "next/link";
import * as React from "react";

type Props = {
  text: string;
  route: string;
};

const NavigationLink = ({ text, route }: Props) => {
  return (
    <Link
      href={route}
      className="flex items-center justify-center px-4 hover:cursor-pointer hover:border-b-ll-blue hover:border-b-4"
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
