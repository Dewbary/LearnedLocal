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
      className="flex items-center justify-center rounded-full p-4 transition-colors hover:cursor-pointer hover:bg-ll-blue hover:text-ll-grey"
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
