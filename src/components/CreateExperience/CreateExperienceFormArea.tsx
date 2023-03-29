import React from "react";

type Props = {
  tabComponent: React.ReactNode;
};

const CreateExperienceFormArea = ({ tabComponent }: Props) => {
  return <div className="">{tabComponent}</div>;
};

export default CreateExperienceFormArea;
