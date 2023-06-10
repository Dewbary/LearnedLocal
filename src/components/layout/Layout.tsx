import React, { PropsWithChildren } from "react";
import { useUser } from "@clerk/nextjs";

const Layout = (props: PropsWithChildren) => {
  const user = useUser();

  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
