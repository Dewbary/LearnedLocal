import Image from "next/image";
import textlistGraphic from "../../../../assets/textlist/textlist_subscribed_graphic.png";
import Link from "next/link";

export default function Confirm() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-ll-grey">
        <div className="flex w-full max-w-sm flex-col items-start gap-5 p-7">
          <div className="flex w-full flex-col items-end">
            <Link className="h-4 w-4" href="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  d="M16.7692 17.6587L8.88464 9.32934L16.7692 1"
                  stroke="#2D2D2D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.00004 17.8576L8.88464 9.52831L1.00004 1.19897"
                  stroke="#2D2D2D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="flex w-full flex-col items-center">
            <div className="aspect-h-1 aspect-w-2 w-full">
              <Image
                src={textlistGraphic}
                alt={"A phone with some texts"}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-raleway text-xl">You&apos;re in!</div>
            <div className="font-inter">
              We appreciate your subscription to our texting list. Updates are
              coming your way!
            </div>
          </div>
          <Link
            href="/home"
            className="flex w-full flex-col items-center rounded-full bg-ll-black py-4 font-inter text-sm text-ll-grey"
          >
            Visit home page
          </Link>
        </div>
      </div>
    </>
  );
}
