import Link from "next/link";
import { Facebook, Instagram } from "react-feather";

export default function Footer() {
  return (
    <>
      <div className="flex w-full flex-col gap-10 bg-ll-black px-6 py-8 text-ll-grey lg:flex-row lg:gap-32 lg:px-14">
        <div className="flex flex-col gap-3 lg:flex-auto">
          <div className="font-raleway">STAY IN THE LOOP</div>
          <div className="font-inter text-sm">
            Sign up with your email address to receive experience updates.
          </div>
          <div className="flex flex-row gap-4 font-inter">
            <input
              className="w-44 px-3 text-sm text-ll-black"
              placeholder="Email Address"
            />
            <div className="flex flex-row items-center justify-center rounded-full border border-ll-black bg-ll-grey px-3 py-3 text-sm text-ll-black transition-colors hover:cursor-pointer hover:border-ll-grey hover:bg-ll-black hover:text-ll-grey lg:px-7">
              Sign Up
            </div>
          </div>
          <Link className="font-inter text-sm underline hover:cursor-pointer" href="/privacy">
            Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-raleway">CONTACT US</div>
          <div className="font-inter text-sm">(385) 309-3194</div>
          <div className="font-inter text-sm">
            11124 N 6000 W<br />
            Highland, UT 84003
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-raleway">FOLLOW US</div>
          <div className="flex flex-row gap-3">
            <Link
              href="https://www.instagram.com/learnedlocal/"
              target="_blank"
              className="rounded-full bg-ll-grey p-1 text-ll-black hover:bg-ll-black hover:text-ll-grey"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100092194838632"
              target="_blank"
              className="rounded-full bg-ll-grey p-1 text-ll-black hover:bg-ll-black hover:text-ll-grey"
            >
              <Facebook />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
