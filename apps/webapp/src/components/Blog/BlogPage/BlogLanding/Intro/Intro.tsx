import * as React from "react";
import logo_color from "~/public/logo_color.png";
import Image from "next/image";

const Intro = () => {
  return (
    <section className="mt-8 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <div className="flex flex-row items-center">
        <Image
          src={logo_color}
          alt="company logo"
          className="mr-4"
          width={100}
        />
        <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
          Blog.
        </h1>
      </div>
      <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
        Share a hobby, find a new passion
      </h4>
    </section>
  );
};

export default Intro;
