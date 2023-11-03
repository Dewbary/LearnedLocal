import Link from "next/link";

const Failure = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-400 to-gray-600 text-white">
      <h1 className="mb-4 text-5xl font-bold">
        Experience Unable to Be Submitted
      </h1>
      <p className="mb-12 text-xl">
        There were some difficulties submitting your experience. Please try
        again
      </p>
      <Link href="/home">
        <p className="rounded-lg bg-white px-10 py-4 font-semibold text-gray-600 shadow-md transition-colors duration-200 hover:bg-blue-100">
          Return Home
        </p>
      </Link>
    </div>
  );
};

export default Failure;
