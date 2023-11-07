import * as React from "react";
import CreateExperienceButton from "~/components/common/CreateExperienceButton";
import NavigationMenu from "~/components/common/NavigationMenu";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  isSignedIn: boolean;
  isMarketingNavbar: boolean;
};

const NavBarEnd = ({ isSignedIn, isMarketingNavbar }: Props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const closeMenuClicked = () => {
    setMenuOpen(false);
  };

  const openMenuClicked = () => {
    setMenuOpen(true);
  };

  if (isMarketingNavbar) {
    return (
      <div className="md:mr-4">
        <div
          className="h-4 w-4 lg:hidden"
          hidden={!menuOpen}
          onClick={closeMenuClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M16.7692 17.6587L8.88464 9.32934L16.7692 1"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.00004 17.8576L8.88464 9.52831L1.00004 1.19897"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="h-4 w-5 lg:hidden"
          hidden={menuOpen}
          onClick={openMenuClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="21"
            viewBox="0 0 23 21"
            fill="none"
          >
            <line
              x1="1"
              y1="1"
              x2="22"
              y2="1"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="11"
              x2="22"
              y2="11"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="20"
              x2="22"
              y2="20"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="hidden rounded-full border border-ll-black p-2 font-inter text-sm lg:flex flex-row items-center">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <div className="flex h-12 w-20 items-center justify-center transition-colors hover:cursor-pointer hover:border-b-ll-blue hover:border-b-4">
                  Login
                </div>
              </SignInButton>
              <SignUpButton>
                <div className="flex h-12 w-24 items-center justify-center rounded-full bg-ll-yellow transition-opacity hover:cursor-pointer hover:bg-opacity-60">
                  Join
                </div>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link 
                href="/myexperiences"
                className="flex h-12 w-32 items-center justify-center rounded-full bg-ll-yellow transition-opacity hover:cursor-pointer hover:bg-opacity-60"
              >
                My Experiences
              </Link>
              <SignOutButton>
                <div className="flex h-8 w-20 items-center justify-center transition-colors hover:cursor-pointer hover:border-b-ll-blue hover:border-b-4">
                  Logout
                </div>
              </SignOutButton>
            </>
          )}
        </div>
        {/* The following code is for the mobile hamburger menu "dropdown" */}
        <div
          className="fixed left-0 top-0 z-[-1] h-screen w-screen bg-ll-grey lg:hidden"
          hidden={!menuOpen}
        >
          <div className="flex flex-col items-center gap-20 pt-36 font-inter">
            <div className="flex flex-col items-center gap-8 text-ll-black">
              <Link href="/about">Our story</Link>
              <Link href="/host">Become a host</Link>
              <Link href="/home">Find an experience</Link>
              {/* <Link href="/blog">Our blog</Link> */}
            </div>
            <div className="flex flex-col items-center gap-8 text-sm">
              {!isSignedIn ? (
                <>
                  <SignInButton>
                    <button className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black">
                      <div>Login</div>
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <div className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black bg-ll-black text-ll-grey">
                      Join
                    </div>
                  </SignUpButton>
                </>
              ) : (
                <>
                  <Link href="/myexperiences" className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-blue bg-ll-blue text-ll-grey">
                    My Experiences
                  </Link>
                  <SignOutButton>
                    <button className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black">
                      <div>Logout</div>
                    </button>
                  </SignOutButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:mr-4">
      <div className="mr-2 hidden md:block">
        <CreateExperienceButton className="rounded-3xl bg-ll-yellow px-6 py-4 font-sans text-sm" />
      </div>

      <NavigationMenu isSignedIn={isSignedIn} />
    </div>
  );
};

export default NavBarEnd;
