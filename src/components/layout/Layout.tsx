import React, { PropsWithChildren } from "react";
import { useUser } from "@clerk/nextjs";

const Layout = (props: PropsWithChildren) => {
  const user = useUser();

  return (
    <div className="grid min-h-screen grid-rows-header bg-white">
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
