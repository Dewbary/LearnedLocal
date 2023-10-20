import Link from "next/link";
import React from "react";

const Success = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-amber-400 to-amber-600 text-white px-10">
      <h1 className="mb-4 text-5xl font-bold">
        Experience Submitted Successfully!
      </h1>
      <p className="mb-12 text-xl">
        Your experience has been successfully added. We will verify your
        experience in 1-3 business days.
      </p>
      <Link href="/">
        <p className="rounded-lg bg-white px-10 py-4 font-semibold text-amber-600 shadow-md transition-colors duration-200 hover:bg-blue-100">
          Return Home
        </p>
      </Link>
    </div>
  );
};

export default Success;
