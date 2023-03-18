import { useRouter } from "next/router";
import React, { useMemo } from "react";
import DescriptionPage from "./DescriptionPage";
import LocationPage from "./LocationPage";
import TimePage from "./TimePage";

type Props = {
  tabComponent: React.ReactNode;
};

const CreateExperienceFormArea = ({ tabComponent }: Props) => {
  return <div>{tabComponent}</div>;
};

export default CreateExperienceFormArea;
