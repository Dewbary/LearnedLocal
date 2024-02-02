import * as React from "react";
import NewNavBar from "../NewNavBar";
import NewFooter from "../NewFooter";
import CreateExperienceFormBody from "./CreateExperienceFormBody";

const CreateExperienceFormLayout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="bg-ll-grey">
          <NewNavBar />
        </div>
        <div className="flex flex-1 bg-ll-grey">
          <CreateExperienceFormBody />
        </div>
        <NewFooter />
      </div>
    </>
  );
};
export default CreateExperienceFormLayout;
