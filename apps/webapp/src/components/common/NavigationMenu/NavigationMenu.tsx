import Link from "next/link";
import * as React from "react";
import CreateExperienceButton from "../CreateExperienceButton";
import SignInArea from "../SignInArea";
import { Typography } from "../Typography";

type Props = {
  isSignedIn: boolean;
};

const NavigationMenu = ({ isSignedIn }: Props) => {
  return (
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
        className={`menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-100 p-2 shadow ${Typography.BodyText}`}
      >
        <li>
          <Link className="p-2" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="p-2" href="/home">
            Find an experience
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
          <Link className="p-2" href="/account/profile">
            My Profile
          </Link>
        </li>
        <li>
          <Link className="p-2" href="/about">
            Our Story
          </Link>
        </li>
        <li>
          <Link className="p-2" href="/host">
            Become a host
          </Link>
        </li>
        {/* <li>
          <Link className="p-2" href="/blog">
            Blog
          </Link>
        </li> */}
        <li>
          <SignInArea isSignedIn={isSignedIn} />
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
