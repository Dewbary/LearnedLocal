import React, { useMemo } from "react";

type Props = {
  tabComponent: React.ReactNode;
};

const CreateExperienceFormArea = ({ tabComponent }: Props) => {
  return <div>{tabComponent}</div>;
};

export default CreateExperienceFormArea;
