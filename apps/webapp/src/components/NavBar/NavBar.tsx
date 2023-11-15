import * as React from "react";
import Link from "next/link";
import SignInArea from "../common/SignInArea";
import CreateExperienceButton from "../common/CreateExperienceButton";
import Image from "next/image";
import white_logo from "../../../assets/logo_white_bg.png";

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
      className={`fixed left-0 top-0 z-30 h-16 border-b-2 border-b-slate-100 md:relative ${
        className ?? ""
      } `}
    >
      <div className="">
        <Link href="/home" className="btn btn-ghost text-xl normal-case">
          <Image src={white_logo} alt="company logo" className="mr-3 w-10" />
          <div className="font-poppins font-black text-gray-800">
            Learned Local
          </div>
        </Link>
      </div>

      <div className="navbar-end">
        {showCreateExperienceButton && (
          <CreateExperienceButton className="invisible rounded-full border-none bg-gradient-to-br from-amber-400 to-amber-500 px-6 py-3 font-bold text-white drop-shadow-md hover:cursor-pointer hover:from-amber-300 hover:to-amber-300 md:visible" />
        )}
        <div className="dropdown dropdown-end dropdown-bottom">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
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
            className="menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link className="p-2" href="/home">
                Home
              </Link>
            </li>
            <li>
              <CreateExperienceButton className="p-2" />
            </li>
            {isSignedIn ? (
              <li>
                <Link className="p-2" href="/myexperiences">
                  My Experiences
                </Link>
              </li>
            ) : null}
            <li>
              <Link className="p-2" href="/profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="p-2" href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="p-2" href="/host">
                About Hosting
              </Link>
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
