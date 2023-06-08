import * as React from "react";

const Register = () => {
  return (
    <div className="mx-10 my-10 flex flex-col items-center">
      <span id="hostexperience" />
      <h2 className="text-5xl font-bold lg:text-7xl">Become a Local</h2>
      <h3 className="my-6 text-xl">
        Want to host an experience? Sign up to start sharing your passion with
        others.
      </h3>
      <button className="btn-primary btn" onClick={() => navigateToHosting()}>
        Learn More
      </button>
    </div>
  );
};

export default Register;
