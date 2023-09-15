import * as React from "react";
import Link from "next/link";
import SignInArea from "../common/SignInArea";
import CreateExperienceButton from "../common/CreateExperienceButton";
import Image from "next/image";
import white_logo from "../../public/logo_white_bg.png";

type Props = {
  isSignedIn: boolean;
  showCreateExperienceButton?: boolean;
  className?: string;
};

const NavBar = ({
  isSignedIn,
  showCreateExperienceButton,
  className,
}: Props) => {
  return (
    <div
      className={`navbar fixed top-0 left-0 z-30 h-16 border-b-2 border-b-slate-100 md:relative ${
        className ?? ""
      } `}
    >
      <div className="navbar-start">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          <Image src={white_logo} alt="company logo" className="mr-3 w-10" />
          <div className="font-poppins font-black text-gray-800">
            Learned Local
          </div>
        </Link>
      </div>

      <div className="navbar-end">
        {showCreateExperienceButton && (
          <CreateExperienceButton className="invisible rounded-full border-none bg-gradient-to-br from-amber-400 to-amber-500 p-4 font-bold text-white drop-shadow-md hover:cursor-pointer hover:from-amber-300 hover:to-amber-300 md:visible" />
        )}
        <div className="dropdown-bottom dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/host">About Hosting</Link>
            </li>
            <li>
              <Link href="/profile">My Profile</Link>
            </li>
            <li>
              {isSignedIn ? (
                <Link
                  className="btn-primary btn mb-2 hidden lg:flex"
                  href={`/myexperiences`}
                >
                  My Experiences
                </Link>
              ) : null}
            </li>
            <li>
              <CreateExperienceButton className="mb-2 rounded-full border-none bg-gradient-to-br from-amber-400 to-amber-500 p-2 font-bold text-white drop-shadow-md hover:cursor-pointer hover:from-amber-300 hover:to-amber-300" />
            </li>
            <li>
              <SignInArea isSignedIn={isSignedIn} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
