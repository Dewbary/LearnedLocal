import React, { PropsWithChildren } from "react";
import { Header } from "../Header";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen grid-rows-header bg-white">
      <div className="z-10 bg-white shadow-sm">
        <Header />
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
