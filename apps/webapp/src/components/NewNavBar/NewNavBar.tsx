import * as React from "react";
import CreateExperienceButton from "../common/CreateExperienceButton";
import Title from "../common/Title";
import NavigationMenu from "../common/NavigationMenu";
import Link from "next/link";
import NavigationLink from "../common/NavigationLink";
import { useRouter } from "next/router";
import NavBarEnd from "./NavBarEnd";

type Props = {
  isSignedIn: boolean;
};

const NewNavBar = ({ isSignedIn }: Props) => {
  const router = useRouter();
  return (
    <div
      className={`navbar z-20 justify-between ${
        router.asPath != "/landing"
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
      {router.asPath == "/landing" && (
        <div className="navbar-center">
          <div className="hidden gap-8 font-inter text-sm lg:flex">
            <NavigationLink text="Our story" route="/about" />
            <NavigationLink text="Become a host" route="/host" />
            <NavigationLink text="Find an experience" route="/" />
            <NavigationLink text="Our blog" route="/blog" />
          </div>
        </div>
      )}

      {/* Navbar end, responsive mobile hamburger menu / login button */}
      <NavBarEnd isSignedIn={isSignedIn} />
    </div>
  );
};

export default NewNavBar;
