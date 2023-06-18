import * as React from "react";
import SignInArea from "../SignInArea/SignInArea";
import Link from "next/link";
import Image from "next/image";
import logo_white from "../../assets/logo_white_bg.png";

type Props = {
  isSignedIn: boolean;
  className?: string;
};

const NavBar = ({ isSignedIn, className }: Props) => {
  return (
    <div className={`navbar fixed z-10 h-16 md:relative ${className ?? ""} `}>
      <div className="navbar-start">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          <Image
            src={logo_white}
            alt="company logo"
            className="mr-3 hidden w-10 lg:block"
          />
          Learned Local
        </Link>
      </div>

      {/* <div className="navbar-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-xs rounded-3xl border-2 p-2 px-6"
        />
      </div> */}

      <div className="navbar-end">
        <div className="dropdown dropdown-bottom dropdown-end">
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
              <Link href="/myexperiences">My Experiences</Link>
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
              <SignInArea isSignedIn={isSignedIn} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
