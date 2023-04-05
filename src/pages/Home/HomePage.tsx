import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div>Create a New Experience</div>
      <Link href={"/experience/create/hello-world"}>Create an Experience</Link>
      <div className="dropdown-end dropdown">
        {sessionData?.user ? (
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
        )}
      </div>
    </>
  );
};

export default HomePage;
