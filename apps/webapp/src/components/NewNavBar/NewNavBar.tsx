import * as React from "react";
import Link from "next/link";
import NavigationLink from "../common/NavigationLink";
import NavBarEnd from "./NavBarEnd";
import logoFull from "../../../assets/logo/full-logo.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NewNavBar = () => {

  const prevScrollPos = useRef(0)

  const [showNavBar, setShowNavBar] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos.current > currentScrollPos || currentScrollPos < 100) {
        setShowNavBar(true);
      } else if (prevScrollPos.current < currentScrollPos) {
        setShowNavBar(false);
      }
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openMobileMenuClicked = () => {
    setMobileNavOpen(true);
  }

  const closeMobileMenuClicked = () => {
    setMobileNavOpen(false);
  }

  return (
    <>
      <div className="w-full h-24 lg:h-28">
        <div className={`fixed flex flex-row w-full p-5 bg-transparent z-10 ${showNavBar || mobileNavOpen ? "" : "-translate-y-40"} transition-all duration-700`}>
          <div
            className="flex flex-row items-center w-full justify-between h-16 lg:h-22 border border-ll-slate bg-ll-cloud rounded-md"
          >
            {/* Navbar title and logo */}
            <div className="ml-4 md:ml-12">
              <Link href="/">
                <Image
                  src={logoFull as string}
                  width={290}
                  alt="Learned Local"
                  className="w-44 lg:w-64"
                />
              </Link>
            </div>

            {/* Mid-navbar links */}

            <div className="navbar-center">
              <div className="hidden gap-8 lg:flex">
                <NavigationLink text="Our story" route="/about" />
                <NavigationLink text="Become a host" route="/host" />
                <NavigationLink text="Find an experience" route="/home" dataCy="desktop-home-link"/>
                {/* <NavigationLink text="Our blog" route="/blog" /> */}
              </div>
            </div>


            {/* Navbar end, responsive mobile hamburger menu / login button */}
            <NavBarEnd onMenuOpen={openMobileMenuClicked} onMenuClose={closeMobileMenuClicked}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewNavBar;
