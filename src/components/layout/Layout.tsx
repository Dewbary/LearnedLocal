import React, { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen grid-rows-header bg-white">
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
