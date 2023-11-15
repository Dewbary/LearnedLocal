import * as React from "react";
import Title from "../common/Title";
import Link from "next/link";
import NavigationLink from "../common/NavigationLink";
import NavBarEnd from "./NavBarEnd";

type Props = {
  isSignedIn: boolean;
  isMarketingNavBar: boolean;
};

const NewNavBar = ({ isSignedIn, isMarketingNavBar }: Props) => {
  return (
    <div
      className={`navbar z-20 justify-between ${
        !isMarketingNavBar
          ? "fixed h-20 border-b border-ll-slate bg-ll-grey"
          : ""
      }`}
    >
      {/* Navbar title and logo */}
      <div className="ml-4 md:ml-12">
        <Link href="/home">
          <Title text="Learned Local" />
        </Link>
      </div>

      {/* Mid-navbar links */}
      {isMarketingNavBar && (
        <div className="navbar-center">
          <div className="hidden gap-8 font-inter text-sm lg:flex">
            <NavigationLink text="Our story" route="/about" />
            <NavigationLink text="Become a host" route="/host" />
            <NavigationLink text="Find an experience" route="/home" />
            {/* <NavigationLink text="Our blog" route="/blog" /> */}
          </div>
        </div>
      )}

      {/* Navbar end, responsive mobile hamburger menu / login button */}
      <NavBarEnd
        isSignedIn={isSignedIn}
        isMarketingNavbar={isMarketingNavBar}
      />
    </div>
  );
};

export default NewNavBar;
