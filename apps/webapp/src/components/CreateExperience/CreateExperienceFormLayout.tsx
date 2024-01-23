import * as React from "react";
import NewNavBar from "../NewNavBar";
import NewFooter from "../NewFooter";
import CreateExperienceFormBody from "./CreateExperienceFormBody";

const CreateExperienceFormLayout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <NewNavBar className="bg-ll-grey" />
        <CreateExperienceFormBody />
        <NewFooter />
      </div>
    </>
  );
};
export default CreateExperienceFormLayout;
