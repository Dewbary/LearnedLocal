import React, { PropsWithChildren, useState } from "react";
import { Header } from "../Header";
import Sidebar from "../CreateExperience/CreateExperienceTabs";
const Layout = (props: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div className="z-10 bg-white shadow-sm">
        <Header />
      </div>
      <div>{props.children}</div>
      {/* <div className="grid md:grid-cols-sidebar">
        <div className="bg-zinc-50 shadow-md">
          <Sidebar open={showSidebar} setOpen={setShowSidebar} />
        </div>
      </div> */}
    </div>
  );
};

export default Layout;
