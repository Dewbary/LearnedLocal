import * as React from "react";
import Footer from "~/components/Footer/Footer";
import Meta from "~/components/common/Meta";

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default BlogLayout;
