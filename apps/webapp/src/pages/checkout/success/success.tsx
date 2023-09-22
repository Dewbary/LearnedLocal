import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Success = () => {
  const router = useRouter();

  const handleContinueShopping = async () => {
    await router.push("/");
  };

  return (
    <>
      <Head>
        <title>Learned Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12">
        <div className="w-full max-w-md rounded-lg bg-white px-8 py-6 shadow-lg">
          <div className="text-center">
            <svg
              className="mx-auto mb-8 h-20 w-20 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Payment Successful
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Thank you for your purchase! Your order has been successfully placed
              and a confirmation email has been sent to you.
            </p>
            <button
              onClick={handleContinueShopping}
              className="w-full rounded-lg bg-blue-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Link href="/">Return Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
