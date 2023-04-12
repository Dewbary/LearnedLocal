import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const HomePage = () => {
  // const { data: sessionData } = useSession();

  const user = useUser();

  return (
    <>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
      <div className="dropdown-end dropdown">
        {/* {sessionData?.user ? (
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn"
            onClick={() => void signOut()}
          >
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
              />
            </div>
          </label>
        ) : (
          <button
            className="btn-ghost rounded-btn btn"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        )} */}
        {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
        <div>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</div>
      </div>
    </>
  );
};

export default HomePage;
