import * as React from "react";

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return <div className="font-raleway text-2xl font-bold">{text}</div>;
};

export default Title;
