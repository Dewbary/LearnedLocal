import * as React from "react";
import NavigationMenu from "~/components/common/NavigationMenu";
import {
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUniqueSlug } from "~/components/common/CreateExperienceButton/CreateExperienceUtils";
import { Typography } from "~/components/common/Typography";

type Props = {
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const NavBarEnd = ({onMenuOpen, onMenuClose} : Props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const currentPath = usePathname();
  const signInUrl = `/account/signin?redirect_url=${encodeURI(currentPath)}`;
  const signUpUrl = "/account/signup";
  const { isSignedIn } = useUser();

  const closeMenuClicked = () => {
    setMenuOpen(false);
    if (onMenuClose) {
      onMenuClose();
    }
  };

  const openMenuClicked = () => {
    setMenuOpen(true);
    if (onMenuOpen) {
      onMenuOpen();
    }
  };

  return (
    <div className="mr-4">
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
        className="h-6 w-6 lg:hidden"
        hidden={menuOpen}
        onClick={openMenuClicked}
        data-cy="hamburger-menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      
        {!isSignedIn ? (
          <>
            <div className="hidden rounded-full border border-ll-black p-2 font-inter text-sm lg:flex flex-row items-center gap-1">
              <Link href={signInUrl} className="flex h-12 w-20 items-center justify-center transition-colors hover:bg-ll-black hover:text-ll-grey hover:cursor-pointer rounded-full">
                Login
              </Link>
              <Link href={signUpUrl} className="flex h-12 w-24 items-center justify-center rounded-full bg-ll-orange transition-opacity hover:cursor-pointer hover:bg-opacity-60 text-ll-grey">
                Join
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="hidden p-2 lg:flex flex-row gap-1 items-center font-inter text-sm">
              <Link href="/myexperiences" className="bg-ll-orange text-white px-6 py-4 rounded-full hover:opacity-70 border border-ll-orange transition-all">
                <span className={Typography.ButtonText}>My experiences</span>
              </Link>
              <NavigationMenu isSignedIn={isSignedIn} />
            </div>
          </>
        )}
      
      {/* The following code is for the mobile hamburger menu "dropdown" */}
      <div
        className="fixed left-0 top-0 z-[-1] h-screen w-screen bg-ll-grey lg:hidden"
        hidden={!menuOpen}
      >
        <div className="flex flex-col items-center gap-20 pt-28">
          <div className={`flex flex-col items-center gap-6 text-ll-black ${Typography.BodyText}`}>
            <Link href="/">Home</Link>
            <Link href="/about">Our story</Link>
            <Link href="/home" data-cy="mobile-home-link">Find an experience</Link>
            <Link href="/host">Become a host</Link>
            <Link href={`/experience/create/${getUniqueSlug()}`} data-cy="mobile-create-link">Create an experience</Link>
            <Link href="/account/profile">My profile</Link>
            {/* <Link href="/blog">Our blog</Link> */}
          </div>
          <div className="flex flex-col items-center gap-8 text-sm">
            {!isSignedIn ? (
              <>
                <Link href={signInUrl} className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black" data-cy="mobile-login-button">
                  <div>Login</div>
                </Link>

                <Link href={signUpUrl} className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black bg-ll-black text-ll-grey">
                  Join
                </Link>
              </>
            ) : (
              <>
                <Link href="/myexperiences" data-cy="mobile-my-experiences-link" className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-blue bg-ll-blue text-ll-grey">
                  <span className={Typography.ButtonText}>My Experiences</span>
                </Link>
                <SignOutButton>
                  <button className="flex h-12 w-36 items-center justify-center rounded-full border-2 border-ll-black">
                    <div className={Typography.ButtonText}>Logout</div>
                  </button>
                </SignOutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarEnd;
