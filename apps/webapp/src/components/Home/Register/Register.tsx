import { useRouter } from "next/router";
import * as React from "react";

const Register = () => {
  const router = useRouter();

  const navigateToHosting = async function () {
    await router.push("/host");
  };

  return (
    <div className="mx-10 my-10 flex flex-col items-center">
      <span id="hostexperience" />
      <h2 className="text-5xl font-bold lg:text-7xl">Become a Local</h2>
      <h3 className="my-6 text-xl">
        Want to host an experience? Sign up to start sharing your passion with
        others.
      </h3>
      <button className="btn bg-amber-400 text-white hover:bg-amber-300" onClick={() => navigateToHosting()}>
        Learn More
      </button>
    </div>
  );
};

export default Register;
