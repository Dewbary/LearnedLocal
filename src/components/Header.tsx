import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <nav
      className={classNames({
        "navbar bg-primary text-primary-content": true, // colors
        "flex items-center": true, // layout
        "fixed z-10 h-16 w-full px-4 shadow-sm": true, //positioning & styling
      })}
    >
      <div className="flex-1 pl-5 text-3xl font-bold">
        <article className="prose">
          <h1>Create An Experience</h1>
        </article>
      </div>
      <div className="flex-none gap-2">
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
      </div>
    </nav>
  );
};
