import * as React from "react";
import Title from "../common/Title";
import Link from "next/link";
import NavigationLink from "../common/NavigationLink";
import NavBarEnd from "./NavBarEnd";

type Props = {
  isFixedNavbar?: boolean;
}

const NewNavBar = ({isFixedNavbar} : Props) => {
  return (
    <div
      className={`navbar z-20 justify-between ${
        isFixedNavbar === true
          ? "fixed h-20 border-b border-ll-slate bg-ll-grey"
          : ""
      }`}
    >
      {/* Navbar title and logo */}
      <div className="ml-4 md:ml-12">
        <Link href="/">
          <Title text="Learned Local" />
        </Link>
      </div>

      {/* Mid-navbar links */}

      <div className="navbar-center">
        <div className="hidden gap-8 font-inter text-sm lg:flex">
          <NavigationLink text="Our story" route="/about" />
          <NavigationLink text="Become a host" route="/host" />
          <NavigationLink text="Find an experience" route="/home" dataCy="desktop-home-link"/>
          {/* <NavigationLink text="Our blog" route="/blog" /> */}
        </div>
      </div>


      {/* Navbar end, responsive mobile hamburger menu / login button */}
      <NavBarEnd />
    </div>
  );
};

export default NewNavBar;
