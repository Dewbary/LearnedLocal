import Image from "next/image";
import img from "../../public/hero.jpg";
import sapiens from "../../public/sapiens.png";

type Props = {};

const Header = ({}: Props) => {
  return (
    <div className="-mt-[4rem] grid place-items-center items-end bg-gradient-to-br from-primary to-secondary pt-20 text-primary-content">
      <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
        <div className="lg:pl-10 lg:pb-32">
          <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
            <div className="badge-outline badge mb-4 gap-2 py-3 px-5 font-mono">
              ⏳ <span className="text-xs">Alpha Version</span>
            </div>{" "}
            <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Learned Local
            </h1>{" "}
            <h2 className="font-title text-lg font-extrabold sm:text-xl lg:text-2xl">
              Share a hobby, find a hidden talent
            </h2>
          </div>{" "}
          <div className="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
            <div className="my-2 flex max-w-sm flex-col gap-2 text-left"></div>{" "}
          </div>{" "}
          <div className="mt-4 flex flex-1 justify-center space-x-2 lg:mt-6 lg:justify-start">
            <a
              // sveltekit:prefetch=""
              href="/components"
              className="btn-ghost btn-active btn normal-case lg:btn-lg"
            >
              <span className="hidden sm:inline">View Experiences</span>{" "}
              <span className="inline sm:hidden">Register</span>
            </a>{" "}
            <a
              // sveltekit:prefetch=""
              href="/docs/install"
              className="btn normal-case lg:btn-lg"
            >
              Register
            </a>
          </div>
        </div>{" "}
        <div className="flex-1">
          <Image
            className="h-full w-full object-cover"
            src={sapiens}
            alt="experience"
          />
        </div>
      </div>{" "}
      <svg
        className="col-start-1 row-start-1 h-auto w-full fill-secondary"
        width="1600"
        height="595"
        viewBox="0 0 1600 595"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path>
      </svg>
    </div>
  );
};

export default Header;
