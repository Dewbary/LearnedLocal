import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
    </>
  );
};

export default HomePage;
