import React, { PropsWithChildren } from "react";
import NavBar from "../NavBar/NavBar";
import { useUser } from "@clerk/nextjs";

const Layout = (props: PropsWithChildren) => {
  const user = useUser();

  return (
    <div className="grid min-h-screen grid-rows-header bg-white">
      <div className=" md:mt-0">{props.children}</div>
    </div>
  );
};

export default Layout;
